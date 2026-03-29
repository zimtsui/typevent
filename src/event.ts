export interface Event<out eventTypeUnion extends string> extends globalThis.Event {
    readonly type: eventTypeUnion;
}
export namespace Event {
    export type Prototype = Event<string>;
}

export class CustomEvent<
    out eventTypeUnion extends string,
    payload,
> extends globalThis.CustomEvent<payload> implements Event<eventTypeUnion> {
    public override readonly type: eventTypeUnion;
    public constructor(eventType: eventTypeUnion, payload: payload) {
        super(eventType, { detail: payload });
        this.type = eventType;
    }
}
export namespace CustomEvent {
    export type Prototype = CustomEvent<string, unknown>;
}

export interface EventListener<in event extends Event.Prototype> {
    (event: event): void;
}

export namespace EventMap {
    export type Prototype<in out eventTypeUnion extends string> = {
        [eventType in eventTypeUnion]: Event<eventType>;
    }
}
