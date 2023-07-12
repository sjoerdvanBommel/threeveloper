<span title="Loading" style="--size: 100px; --duration: 1.5s; --color: #33aaaa">
	<div />
	<div />
	<div />
</span>

<style>
	span {
		width: var(--size);
		height: calc(var(--size) / 4);
		position: relative;
		display: block;
	}
	div {
		width: calc(var(--size) / 4);
		height: calc(var(--size) / 4);
		position: absolute;
		left: 0%;
		top: 0;
		border-radius: 2px;
		background: var(--color);
		transform: translateX(-50%) rotate(45deg) scale(0);
		animation: diamonds var(--duration) linear infinite;
	}
	div:nth-child(1) {
		animation-delay: calc(var(--duration) * 2 / 3 * -1);
	}
	div:nth-child(2) {
		animation-delay: calc(var(--duration) * 2 / 3 * -2);
	}
	div:nth-child(3) {
		animation-delay: calc(var(--duration) * 2 / 3 * -3);
	}

	@keyframes diamonds {
		50% {
			left: 50%;
			transform: translateX(-50%) rotate(45deg) scale(1);
		}
		100% {
			left: 100%;
			transform: translateX(-50%) rotate(45deg) scale(0);
		}
	}
</style>
