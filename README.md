# Thinking In React (Search On Click)

This project is a copy of Thinking In React [found here](https://reactjs.org/docs/thinking-in-react.html).

This is achieved by adding a `handleClick()` method to the `FilterableProductTable` component to filter the original products, once filtered it is saved to a state that keeps track of the rows that need to be rendered. That state then gets passed down to the product table where the rendering of the rows is managed.

It has some other minor changes to the code such as changing the filter to an actual `filter` and not a `forEach`
