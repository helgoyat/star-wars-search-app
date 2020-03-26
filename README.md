# Star Wars Search App

Star Wars API can be found [here](https://swapi.co/). (Film resource)

## Concept

Application to operates words search in Star Wars films items, and returns the original list sorted by keywords relevancy.

* Search is limited up to 4 words
* Relevancy is calculated using concept of binary numbers

## Relevance Calculation

Using the concept of binary numbers, each S.W. film item relevancy is calculated by additioning each search word (keyword) relevancy.

To determine each keyword relevancy of an item, a method will receive the occurence value in an item of the given keyword in its parameter and return a 1 byte (8 bits) number.

## Screenshots

Below are some screenshots of the interface

![Screenshot_1](https://github.com/helgoyat/search-app/blob/master/screenshots/capture1.png)

![Screenshot_2](https://github.com/helgoyat/search-app/blob/master/screenshots/capture2.png)