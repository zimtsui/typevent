import { Event, CustomEvent, EventTarget, EventListener } from '@zimtsui/typevent';

type eventMap = {
    foo: CustomEvent<'foo', string>;
    bar: Event<'bar'>;
}

const eventTarget = new globalThis.EventTarget() as EventTarget<keyof eventMap, eventMap>;

const eventTarget4Subscriber: EventTarget.Subscribe<keyof eventMap, eventMap> = eventTarget;
declare const fooListener: EventListener<eventMap['foo']>;
eventTarget4Subscriber.addEventListener('foo', fooListener);

const eventTarget4Publisher: EventTarget.Publish<keyof eventMap, eventMap> = eventTarget;
const customEvent = new globalThis.CustomEvent('foo', { detail: 'hello' }) as eventMap['foo'];
eventTarget4Publisher.dispatchEvent(customEvent);
