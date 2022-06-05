# Immutability

By default, all data in Pendora objects is immutable and can't be updated internally.

## Refreshing

After a function that causes a mutation is run, an [initialiser](objects.md#initialisers) can be specified as a call-back to create a new object with updated information.
