-- INSTALACION LOCAL 
Para este ejemplo uso una VM de 8gb de ram, 100Gb disco 4 Nucleos
Sistema operativo Ubuntu 24.04
version de node 22
postgres 16



// colocar ip fija
sudo nano /etc/netplan/01-netcfg.yaml

network:
  version: 2
  ethernets:
    ens160:
      addresses:
        - 192.168.1.80/24
      gateway4: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4

sudo netplan apply

// instalar nodejs

sudo apt update
sudo apt install nodejs -y
curl -sL https://deb.nodesource.com/setup_24.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
node -v

// instalar postgresql

sudo apt update
sudo apt upgrade -y
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql

// configurar postgres
sudo -i -u postgres
psql
CREATE DATABASE alt64;
ALTER USER postgres PASSWORD 'contraseña1234';

// hacer que sea visible en toda la red (opcional para conectarte con PgAdmin)
sudo nano /etc/postgresql/XX/main/postgresql.conf
--  listen_addresses = '*' --
sudo nano /etc/postgresql/XX/main/pg_hba.conf
-- host    all             all             0.0.0.0/0               md5 --
sudo systemctl restart postgresql
sudo ufw allow 5432/tcp

// instalar redis server
sudo apt-get install redis -y
sudo systemctl enable redis-server
sudo systemctl start redis-server


// backend
npm install --legacy-peer-deps
npm run build
npx sequelize db:migrate
npx sequelize db:seed:all

// frontend
npm install --legacy-peer-deps
npm start


// colocar los servicios en pm2

sudo npm install pm2 -g

cd /alt64/backend
pm2 start npm --name backend --watch -- start
cd /alt64/frontend
pm2 start npm --name frontend --watch -- start
pm2 save
