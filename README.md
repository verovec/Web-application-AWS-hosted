Original project: https://gitlab.com/verovec/tic-abd4

# How to

## Setup local environment
   #### Launch api, front and database
      docker-compose --env-file .env-local up -d api database adminer front
   > -d option runs containers in background, for logs on MS do not put it

   > To see database dashboard go on lo http://localhost:8081 and login with creds in .env-local
   #### Fill game, thème, creneau, role
      docker-compose --env-file .env-local up -d db_init
   #### Add reservation
      docker-compose --env-file .env-local up db_filler
   > this script will never stop, don't forget to stop it

## Setup production environment
   #### Launch api, front and database
      docker-compose --env-file .env-production up -d api database adminer front
   > -d option runs containers in background, for logs on MS do not put it

   > To see database dashboard go on lo http://localhost:8081 and login with creds in .env-production
   #### Fill game, thème, creneau, role
      docker-compose --env-file .env-production up db_init
   #### Add reservation
      docker-compose --env-file .env-production up db_filler
   > this script will never stop, don't forget to stop it

#### Kill
   ##### All microservices
      docker-compose down
   ##### Specific microservice
      docker-compose stop front api database ...

### Deploy
      git tag [version]
      git push --tags
      

