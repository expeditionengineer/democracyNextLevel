# DemocracyNextLevelPlatform



## Getting started

1. Install docker and docker-compose on your system: 
https://docs.docker.com/engine/install/ubuntu/ (Ubuntu installation instructions, please search for your own OS/distro on teh docker site)
2. Clone this repo
3. Create a `.env`-file from the `.env.example`: 
```
    cp .env.example .env
```
3. When in the repos folder execute the following command in the terminal: 
```
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```
4. You can access the django landing page when entering the following address in your browser `0.0.0.0:8000`