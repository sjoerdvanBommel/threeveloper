// TODO: improve
let setTimeout;
import('timers').then((x) => (setTimeout = x.setTimeout));

export { setTimeout };
