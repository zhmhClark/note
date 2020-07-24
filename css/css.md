- multiple style sheets obey the last read rule.
- To use an **external style sheet**, add a link to it in the `<head>` section of the HTML page:
  ```html
  <head>
  <link rel="stylesheet" href="styles.css">
  </head>
  ```
- To define a specific style for one **special element**, add an id attribute to the element:
  ```html
  <p id="p01">I am different</p>
  ```
  ```css
  #p01 {
    color: blue;
    }
  ```
- To define a style for **special types of elements**, add a class attribute to the element:
   ```html
  <p class="error">I am different</p>
  ```
  ```css
  p.error { <!-- only p with class error -->
    color: blue;
    }

  .error{ <!-- all elements with class error-->
    color: blue;
  }  
  
  ```
- \* used as universial mark.
- * `background-repeat` defines the behavior of bgi.<br>
  * `background-position` defines the location of bgi.<br>
  * `background-attachment` property specifies whether the background image should scroll or be fixed (will not scroll with the rest of the page)<br>
  * To shorten the code, it is also possible to specify all the background properties in one single property. This is called a shorthand property.
    ```html
    background: #ffffff url("img_tree.png") no-repeat right top;
    ```
    the order 
     * background-color
     * background-image
     * background-repeat
     * background-attachment
     * background-position
- **margin** shorthand property order: top, right, bottom, left