# Sharp Machine
ver. 0.5.1 by Lukasz Celitan "Spaceghost"  
https://spaceout.pl

Sharp Machine is an image optimizing program cli meant to be installed globally. After execution Sharp Machine will scan for images and optimize them according to config set up via interactive cli. 

You can resize, crop and force format and edit whole sharp module config (will open your fav editor) via cli command.

Uses sharp npm module as base for image manipulation.

## Installation 

```sh
npm i -g sharpmachine
```


## Run sharp machine

Navigate to a folder with images and run

```sh
sharpmachine 
```

![Choose input and output dir](https://blog.spaceout.pl/content/images/size/w300/2019/11/sharpimage.png)


1. Either type folder name, or type "." for current folder (required) 
2. Enter output folder (required)

## Commands 

![Sharpmachine Coammands](https://blog.spaceout.pl/content/images/2019/11/Screenshot-from-2019-11-24-14-04-29.png)

If selected folder contains images (png, jpg, gif, webp), you can : 

1. Optimize images with default config; Images will optimized with 80 quality, unless specified via cli, the images will not be resized.  


2. Optimize images to webp format with default config; Images will optimized with 80 quality, unless specified via cli, the images will not be resized. 

For both options cli will ask for resizing options, if specified yes, cli will demand width (number: required), height (number: leave empty to keep the aspect ration) and image quality (0 - 100)

3. Custom Config; custom config option will open your favorite text editor, where global sharp image config resides:

```
 {
    "quality":90,
    "rotate":false,
    "trim":false,
    "jpegQuality":90,
    "pngQuality":90,
    "webpQuality":90,
    "jpegProgressive":true,
    "cropFocus":"left top",
    "width":false,
    "height":false,
    "pngCompressionLevel":9,
    "pngCompressionSpeed":4,
    "toFormat":"",
    "useMozJpeg":false
 }

```
edit, save and quit

Configuration options and types can be found at: https://sharp.pixelplumbing.com/en/stable/api-operation/ 


4. Verbose (yes/no) Shows simple statistics on executed files. (Slower)

## Contribution 

All requests are more than welcome 

## ToDo

* Select files from the list
* Improve folder and file stats

## License: 
Type: ISC

Author: Lukasz Celitan, "Spaceghost", https://spaceout.pl, info@spaceout.pl

![Spaceghost](https://blog.spaceout.pl/content/images/2018/11/spaceghost-1.jpg)



