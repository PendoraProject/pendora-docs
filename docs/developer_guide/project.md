---
title: Project
---

# {{ $frontmatter.title }}

When working with this parsed data, it is often helpful to have a singular structure that can encapsulate all of this at once.
Enter the Project. 
```rust
pub struct Project {
    pub global: Global,
    pub objects: HashMap<String, Object>,
    pub methods: HashMap<String, Method>,
}
```
Projects are very simple in design, consisting of one Global Object and two hashmaps containing the Objects and Methods respectively, using their names as keys.
The choice of HashMaps over Vec's was to prevent manually iteration over all with name checks and make sure the names of Objects and Methods are unique.
Ironically this does lead to the amusing fact that an Object can have the same name as a Method.

When the function `parse_project()` is called, it will traverse the provided directory, tokenising and parsing any files with the `.pendora` file extension using WalkDir.
`parse_project()` will always error if it cannot find a Global Object. This is done by initialising a variable as `None` and then assigning `Some(global)` to it when the Global object is parsed.
Due to the use of mutability in the strategy, it means that the last Global Object parsed (the deepest nested file) will be the "offical" one if multiple exist.
::: danger
Seriously, don't have multiple globals. There is no practical advantage, so just don't. Please. I'm begging.
:::
Other than that all other errors are just propagated from the other parsing functions.

