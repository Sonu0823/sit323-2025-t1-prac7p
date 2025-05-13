# SIT323 Task 9.1P 
# Adding MongoDB to a Containerized Node.js Microservice

## Overview

This project extends a previously containerized Node.js microservice by integrating it with a MongoDB database. The application is deployed using Kubernetes and demonstrates how microservices interact with a persistent database in a cloud-native environment.


## Setup and Deployment

### 1. Prerequisites

Ensuring the following tools are installed:

- Node.js
- Docker
- Kubernetes (Docker Desktop)
- kubectl
- PowerShell (for testing via `Invoke-RestMethod`)

### 2. Building and Pushing Docker Image

docker build -t yourdockerhub/node-mongo-app .
docker push yourdockerhub/node-mongo-app

### 3. Deploy MongoDB and the App to Kubernetes

Running the following commands from the root project directory to apply the configuration: 

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml

### 4. Testing the Application

After deploying, we can interact with the application using powershell.

    1. Create a User (POST):
        " Invoke-RestMethod -Uri http://localhost:30001/users -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"name": "Sonu", "email": "sonu@deakin.edu.au"}' "
    
    2. Fetch All Users (GET) 
        " Invoke-RestMethod -Uri http://localhost:30001/users -Method GET "


### MongoDB Configuration:

MongoDB is deployed as a single instance using Kubernetes.

User credentials are stored in a Kubernetes Secret.

Persistent storage is configured using a PersistentVolume and PersistentVolumeClaim.

## Features:

Node.js app with Express + Mongoose

MongoDB database for persistent storage

Kubernetes deployment with:

Secrets

Persistent storage

Internal services

Environment variable-based configuration

Tested CRUD functionality via PowerShell


### Backup Strategy:
To implement backups, MongoDB’s built-in tool mongodump can be used on a scheduled cron job inside Kubernetes or with external tools. Alternatively, MongoDB Atlas provides automated backup and recovery options with minimal config.

### Monitoring:
Logs can be observed using kubectl logs <pod-name>. For production-like setups, Prometheus and Grafana can be integrated for real-time performance monitoring of MongoDB and the Node.js application.


### Submission Checklist

 Node.js app integrated with MongoDB.

 Deployed to Kubernetes.

 Persistent volume configured.

 Secrets used for credentials.

 App performs CRUD operations successfully.

 PowerShell tested with Invoke-RestMethod.
