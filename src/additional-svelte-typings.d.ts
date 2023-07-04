declare namespace svelteHTML {
	interface HTMLAttributes {
		'on:debounced'?: (event: CustomEvent) => void;
	}
}
