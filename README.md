# Intoduction
This is an updated version of a previous react todo list application with a node.js backend.
mySQL was used to develope the database.
Database is hosted with AmazonAWS.
Finished on 6/18/2021.

## Tasks for the future
Impove css for mobile.
(I'm never really satisfied with this part.)
Include pictures into process to be more concise.

## Bugs
No Bugs!!!

## Process (With all my mistakes)
To start, I first want to celebrate I finally finished this project!!
I'm incredibly satisfied with myself for this project. I know it's not a huge project, but I learned
so much during this project (especially in the back-end). I was first intimidated by the prospect of
having to use so many new things like AmazonRDS, EC2, ELB, NGINX, buying my own domain 
but I was able to learn, adapt and write my own backend. I feel so much more 
capable with my skills as a full-stack developer!

### Episode 1: "Oh this will be an easy project!"
#### Objective: Make a client/server side todo List as a project.
NOTE: I'm ommitting all problems with Security Groups because they're miniscule problems in hindsight.
1. First develope the client side with react.js (with a temperary back-end via a json file).
2. Develope, connect and test a server locally hosted with node.js.
3. Import data into a Local MySQL database with MySQL Workbench and connect all endpoints so the client and server could communicate with the DB.
4. Push and deploy code to github and set up gh-pages.

### Episode 2: "Well.. I want this to work with github pages... I'm sure it won't be hard."
#### Objective: Create a VPC with AmazonAWS for persistance on the client side.
1. Deployed the front end to github pages
2. Looked at options for me to host the DB (i.g. Heroku, AmazonAWS).
3. Decided on AmazonRDS and EC2. Created a RDS instance, control via MySQL Workbench, import data.json and RDS was established.
4. Created EC2 Instance (and get completely confused by Security groups and... what? How do I SSH into this? What is EC2 EVEN FOR???)
5. Spend an entire day figuring out how EC2 relates to RDS. Realize this is where I should be putting my node.js code in my EC2 instance much like how I had client with React and server with Node. **ignore my tangent, log into your EC2 with bash. Commands below:**

`chmod 400 ~/.ssh/your-key-name.pem`
gives reading ownership of the key to the user
`$ ssh -i ~/directory-to-sshkey/whatever-your-key-name-is.pem user@ec2-xx-xxx-xx-xx.eu-west-1.compute.amazonaws.com` <br />
SSH into EC2 via a key.pem.<br />
`$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh` <br />
installs NVM to EC2.<br />
`$ source ~/.bashrc` <br />
if you don't want to log in and out after nvm is installed, this changes directory to the VPC.<br />
`$ nvm install 13` <br />
Now that NVM is installed, you can download node v13.<br />
`$ mkdir server` <br />
create a new directory called server.<br />
`$ npm init`<br />
creates a package.json which will track your dependencies.<br />

`$ npm -i "package-name"` <br />
Installs all your packages. I referenced my package.json from my local copy.<br />
This project used cors, dontenv, express, mysql, nodemon<br />
`$ nano index.js`<br />
creates the index.js file. I pulled the data from github, but if it's not already pushed on git, you can use nano to quickly copy and paste the code from a local copy.<br />
`$ node index.js` <br />
starts the server! it should be working now on whatever port you set up in your code.<br />

6. go to your EC2 instance and type the address with your listener into your address bar. `(i.g. 12.2.3.4.6:4330)`<br />
7. Set up ELB for EC2 (public IPv4 for the EC2 instance changes every reboot. It's convinent to set up ELB for that reason.)<br />
8. set up all endpoints with the front end and have everything work on your locally hosted front end but then have everything fall apart when you try to connect the EC2 to gh-pages because not only did you not have a reverse-proxy manager, you also don't have certificates for HTTPS OR a domain... How do I even set that up? Why do I even need them?

### Episode 3: " Okay... Well this is the final mile... I'll get this done Tommorrow."
#### Objective: Configure EC2 to route traffic over HTTPS
1. Search for ALL your problems on stackoverflow. I can't get a certificate for EC2? I NEED to buy a domain? Okay... let me just google that.
2. Configure domain's DNS ANAME to Public IPv4 address of EC2 Instance. (Wait 24 hours. It takes a while for domain to configure this).
3. Here's the fun part! Lets install nginx, pm2 and get all the certificates!

#### Notes on why you should NOT follow NGINX documentation:
 On nginx's documentation, they recommend you put configurations into `/etc/nginx/conf.d`.
 All configurations in conf.d are global so it does make sense to put some configurations there, but otherwise,
 it's much more convienent to put all vhost configurations into `/etc/nginx/sites-available/` regardless if they are disabled or not.
 **The abstraction of sites-* is better organized and has better modulation.** You can enable, disable and store different vhost with this directory, 
 so I recommend you don't follow documentation for this reason.
 Once you set up your configuration, you need set a symbolic link to `/etc/nginx/sites-enabled/` from `/etc/nginx/sites-available.`
 
`$ apt-get update` <br />
always a good idea to keep your packages updated.<br />
`$ sudo apt-get install certbot`<br />
install certbot (Makes certificate management easier).<br />
`$ apt-get install python3-certbot-nginx`<br />
install certbot package for nginx<br />

`$ sudo rm /etc/nginx/sites-enabled/default` <br />
remove the default configurator for nginx.<br />
`$ sudo nano /etc/nginx/sites-available/name_of_your_config_file` <br />
create your configuration. I put an example one, but certbot will automatically configure this for you. I do recommend you double-check with:<br />


```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    server_name example.com www.example.com;
}
```
`sudo certbot --nginx -d yoursite.com -d www.yoursite.com`<br />
generate certificates with Nginx plug-in.<br />
Note: Let's Encrypt certificates expire after 90 days.<br />

4. respond to the prompts from certbot.<br />
5. Check on your configuration to make sure certbot has changed your configuration.<br />
`$ cat /etc/nginx/sites-available/name_of_your_config_file`<br />
if certbot doesn't configure it correctly, here's an example of how it should have generated:<br />
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    server_name  example.com www.example.com;

    listen 443 ssl; # managed by Certbot

    # RSA certificate
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot

    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot

    # Redirect non-https traffic to https
    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    } # managed by Certbot
}
```
And your done! I recommend testing on your domain to see if your API is running on HTTPS.
If something is missconfigured, I recommend you check out the nginx documentation.
https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/#auto-renewal

6. Set up PM2. PM2 will keep the node backend running even when you exit your EC2 instance.<br />
`npm install pm2`<br />
installs pm2<br />
`pm2 start index.js`<br />
run and maintains your node program.<br />

7. Spend some time connecting your client, server so they connect to your domain.

8. dOnE!
