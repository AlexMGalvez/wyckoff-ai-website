# Wyckoff.AI Website - A Work in Progress

![alt text](https://github.com/AlexMGalvez/wyckoff-ai-website/blob/master/public/logo-large-light.png?raw=true)

> Wyckoff AI aims to make traditionally closed source institution trading software free and open source to the public and easily accessible from the browser

## General Info
This is an AI-assisted stock trader’s financial instrument for detecting stock market manipulation patterns as per the technical analysis principles of one of the five "titans of technical analysis", Richard Wyckoff. 

The goal of this software is to assist with a trader’s decision in identifying potential high-reward/low-risk financial positions of a stock strategically during phases when large institutional interests are simultaneously planning to manipulate the stock's value for their own profit.

The incomplete model shows early promising results but given the time-consuming and ambitious nature of this project, it is far from producing consistently reliable output. The gathering of training data is an on going work in progress, and the layers and neurons have yet to be fully optimized. The model currently has an issue with underfitting, but loss functions continue to improve the more that training data is added.

## Technical Info
This repository is of the full stack user interface for loading the pre-trained model into the client's browser and classifying patterns. For the model source code check my other repository wyckoff-ai-model

## Technologies
* React
* Next.js
* Redux
* Tensorflow.js - version 2.0.0