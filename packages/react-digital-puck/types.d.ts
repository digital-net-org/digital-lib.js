import type {
    DefaultComponentProps,
    DefaultRootFieldProps,
} from '@measured/puck';

/*
 * This is a workaround for the current Puck implementation. It's currently not possible to set default PuckEditor
 * value on a state change (only on initial load) instead, we use the dispatch method to handle this.
 *
 * id: Is used to identify the entity data came from.
 */

interface Augmented {
    id?: string;
}

declare module '@measured/puck' {
    interface Data<
        Props extends DefaultComponentProps = DefaultComponentProps,
        RootProps extends DefaultComponentProps = DefaultRootFieldProps,
    > extends Augmented {
        root: RootData<RootProps>;
        content: Content<Props>;
        zones?: Record<string, Content<Props>>;
    };
}
