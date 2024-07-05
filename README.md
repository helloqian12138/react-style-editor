# react-style-editor

a form that generate css styles or CSSProperties

# DEV Guide: How to start the project on my own computer?

1. init env

require: node version >= 18

```sh
npm install
cd example && npm install
```

2. link the package

```sh
npm run build
npm link
```

3. watch and start coding

```sh
npm run dev
```

4. link the package to demo

```sh
cd example
npm link css-style-editor
```

5. start the demo

```sh
cd ..
npm run example
```

# User Guide: How to use the package?

```jsx
import StyleEditor from 'css-style-editor';

<StyleEditor size={'small | middle | large' | undefined} />;
```

# API Documentation

| PROPS | Description    | Type                                  | Required | DefaultValue |
| ----- | -------------- | ------------------------------------- | -------- | ------------ |
| size  | Component Size | small \| middle \| large \| undefined | False    | undefined    |
