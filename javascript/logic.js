// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

function getStats(txt) {
  // This is the clean text version of the input text, it has no punctuation, no uppercase letters, and no leading or traillling spaces
  let cleanText = txt
    .toLowerCase()
    .trim()
    .replace(/["+'.,/#!$%^&*;:{}=\-_`~()\s]+/g, "");

  //This is the list of words with no punctuation and separeated words and numbers
  //Regular expressions are used to clean and split the words
  let text = txt
    .toLowerCase()
    .trim()
    .replace(/["+'.,/#!$%^&*;:{}=\-_`~()]+/g, "")
    .replace(/([a-z]+)(\d+)/g, "$1 $2")
    .split(/\s+/);

  //This is the list of clean lines, used to count the characters of each line and the non empty lines
  //It does not include spaces or tabs
  let cleanLines = txt
    .toLowerCase()
    .replace(/(["+'.,/#!$%^&*;:{}=\-_`~()\t ]+)/g, "")
    .split(/\r\n|\r|\n/);

  //This is the list of lines without cleaning them, used to find the maxLineLength. It is not clean
  // in order to count all the characters, including spaces and punctuation
  let lines = txt.toLowerCase().split(/\r\n|\r|\n/);

  //Number of lines using the clean lines list
  let nLines = cleanLines.length;
  //Numbre of total characters. Counting space characters and all other characters
  let nChars = txt.split("").length;
  //Number of words that have been cleaned. Only includes alphanumeric characters
  let nWords = text.length;
  //Gets the number of non empty lines by filtering the clean lines list and getting the length of that list
  let nNonEmptyLines = cleanLines.filter((line) => line.length > 0).length;
  //gets the length of the clean text(total number of characters of alphanumeric characters in the text) divided by the number of words
  let averageWordLength = cleanText.length / nWords;
  //Gets the biggest line by sorting the lines list (includes all characters)
  let maxLineLength = lines.sort((a, b) =>
    a.length < b.length ? 1 : a.length > b.length ? -1 : 0
  )[0].length;

  // Gets a set of the list of words (alphanumeric characters ['word', '555']) and turns it into a set
  // The set cannot have duplicate values
  // then we turn the set into an array using the spread (...)
  // then sorts the array by the lenght of the words using a custom sort rule
  // using .splice, we select the top 10
  let tenLongestWords = [...new Set(text)]
    .sort((a, b) =>
      a.length < b.length
        ? 1
        : a.length > b.length
        ? -1
        : a > b
        ? 1
        : a < b
        ? -1
        : 0
    )
    .splice(0, 9);

  //dictionary to store the number of occurances of each word
  let occrranceNumbers = {};

  //sort the words using default method
  let sortedWords = text.sort();

  //attach the frequency of each word to the dictionary of occurances
  sortedWords.forEach((element) => {
    if (element in occrranceNumbers) {
      occrranceNumbers[element] += 1;
    } else {
      occrranceNumbers[element] = 1;
    }
  });

  //the array to store the sorted frequencies from the occurance dictionary
  let sortedFrequentWords = [];

  //We push each word and the occurance into an array forming a 2D array
  for (let word in occrranceNumbers) {
    sortedFrequentWords.push([word, occrranceNumbers[word]]);
  }

  //we sort the array using a custom rule (comparing the frequency number)
  sortedFrequentWords.sort((a, b) => b[1] - a[1]);

  //List of the ten most frequent words
  let tenMostFrequentWords = [];

  //We push all the words and their frequencies into an array of strings
  sortedFrequentWords.forEach((word) => {
    tenMostFrequentWords.push(`${word[0]}(${word[1]})`);
  });

  //We take the top 10 words
  tenMostFrequentWords = tenMostFrequentWords.splice(0, 9);

  //Return all the calculated attributes of the given text
  return {
    nChars: nChars,
    nWords: nWords,
    nLines: nLines,
    nNonEmptyLines: nNonEmptyLines,
    averageWordLength: averageWordLength,
    maxLineLength: maxLineLength,
    tenLongestWords: tenLongestWords,
    tenMostFrequentWords: tenMostFrequentWords,
  };
}
