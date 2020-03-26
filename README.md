# Star Wars Search App

Star Wars API can be found [here](https://swapi.co/). (Film resource)

## Concept

Application to operates words search in Star Wars films items, and returns the original list sorted by keywords relevancy.

* Search is limited up to 4 words
* Relevancy is calculated using concept of binary numbers

## Relevance Calculation

Using the concept of binary numbers, each **S.W. film item relevancy is calculated by additioning each search word (keyword) relevancy**.

To determine each **keyword relevancy** of an item, a method will receive the occurence value of the given keyword in a film item as parameter and return a 1 byte (8 bits) number.

* Example

If the keyword 'mission' appears 2 times in an item, its relevance value will be:

Binary: 1100 0000

Decimal: 192

If it occurs 5 times, its relevance will be:

Binary: 1111 1000

Decimal: 248

And so on...

* Note

That chosen calculation method makes that for two given keywords if both appear at least once, the film item **relevance will be higher** than for another film item where one keyword appears a lot of times but the other zero times.

## Screenshots

Below are some screenshots of the interface:

![Screenshot_1](https://github.com/helgoyat/search-app/blob/master/screenshots/capture1.png)

![Screenshot_2](https://github.com/helgoyat/search-app/blob/master/screenshots/capture2.png)