import { EventMap, EventListener } from './event.ts';


export interface EventTarget<
    in out eventTypeUnion extends string,
    in out eventMap extends EventMap.Prototype<eventTypeUnion>,
> extends
    EventTarget.Subscribe<eventTypeUnion, eventMap>,
    EventTarget.Publish<eventTypeUnion, eventMap>
{
    addEventListener<eventType extends eventTypeUnion>(
        eventType: eventType,
        listener: EventListener<eventMap[eventType]> | EventListenerObject | null,
        options?: AddEventListenerOptions | boolean,
    ): void;
    removeEventListener<eventType extends eventTypeUnion>(
        eventType: eventType,
        listener: EventListener<eventMap[eventType]> | EventListenerObject | null,
        options?: EventListenerOptions | boolean,
    ): void;
    dispatchEvent<eventType extends eventTypeUnion>(event: eventMap[eventType]): boolean;
}

export namespace EventTarget {

    //  对于订阅端来说，事件多的是子类型
    export interface Subscribe<
        in eventTypeUnion extends string,
        out eventMap extends EventMap.Prototype<eventTypeUnion>,
    > extends globalThis.EventTarget {
        addEventListener<eventType extends eventTypeUnion>(
            eventType: eventType,
            listener: EventListener<eventMap[eventType]> | EventListenerObject | null,
            options?: AddEventListenerOptions | boolean,
        ): void;
        removeEventListener<eventType extends eventTypeUnion>(
            eventType: eventType,
            listener: EventListener<eventMap[eventType]> | EventListenerObject | null,
            options?: EventListenerOptions | boolean,
        ): void;
    }

    //  对于发布端来说，事件少的是子类型
    export interface Publish<
        out eventTypeUnion extends string,
        in eventMap extends EventMap.Prototype<eventTypeUnion>,
    > extends globalThis.EventTarget {
        dispatchEvent<eventType extends eventTypeUnion>(event: eventMap[eventType]): boolean;
    }
}
