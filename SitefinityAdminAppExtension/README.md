  ## Sitefinity CMS Admin App extensions development kit with sample

  ## NOTE: The APIs for the Beta release of Sitefinity CMS Admin App are not final and are subject to change.

Leveraging the API-first approach of the Admin App, you can extend and add functionality, for example, in the *Actions* menu, in the grid, or for editing of items. This repository contains everything you need to develop your extensions. The included examples demonstrate the main extensibility points of the API.

You can extend the Admin App API independently of the Sitefinity CMS in any IDE that you work with, for example, Visual Studio, Webstorm, Notepad++, and so on. Thus, you can develop and test your extended functionality against multiple Sitefinity CMS environments, local or external. Once finished, you can plug in your new functionality by producing a bundle and deploying it to your project.

### Prereqiusities

Install the Node.js and npm. For more information, see [Installing node](https://docs.npmjs.com/getting-started/installing-node).

### Quick start

1. Clone or download this repository to a location of your choice and execute the following command in the repository **root** folder:
```
npm install
```

2. Start the development server by executing the following command:
```
npm start
```
The Admin App is now served on [localhost](http://localhost:3000). When you first open the URL, you are prompted to configure the Sitefinity CMS instance you are working with. In the URL field, enter the instance details and then save the configuration. You can later change the configuration by navigating to [config] (http://localhost:3000/config). 

Once you setup the Sitefinity CMS instance, the server becomes in watch mode and automatically recompiles and serves any newly created files.

3. When you are done developing execute the following command:
```
npm run build
```
As a result, a JavaScript file (**extensions.bundle.js**) is generated in the **dist** folder.

4. Register your extensions with the Admin App by upload this file to the **extensions.bundle.js** file in the **root** of the Sitefintiy CMS web application and then refresh your Sitefinity CMS page.

### Examples

Example extensions in this project that you can work with include:
* Text Analysis

  Demonstates how to build an extension that provides sentiment analysis, suggested summary, suggested hashtags, and suggested categories for item content.

### API

As with any other Angular project, custom extensions can use the Angular APIs inside the Admin App.
