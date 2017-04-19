# Preacher

Hacky, basic, conversion from csv to ES6 javascript array

## Installation

This isn't on NPM cause it sucks, but if you want to you use it then
download the repo and run `npm ln` from within the directory.

## Usage

`preacher filename.csv`

or

`preacher ./directory`

In: __filename.csv__
```
Key,Value
One,One
Two,Two
```

Out: __filename.js__
```
export default [
  {
    key: "One",
    value: "One",
  },
  {
    key: "Two",
    value: "Two",
  },
];
```
