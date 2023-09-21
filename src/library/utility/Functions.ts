export type Consumer<T> = (t: T) => void
export type Supplier<T> = () => T
export type Predicate<T> = (t: T) => boolean
export type Runnable = () => void
