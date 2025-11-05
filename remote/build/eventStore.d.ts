import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';
import { EventStore, StreamId, EventId } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
/**
 * Simple in-memory implementation of the EventStore interface for resumability.
 *
 * This is primarily intended for MVP and development, not for production use
 * where a persistent storage solution (Redis, PostgreSQL, etc.) would be more appropriate.
 *
 * For production, consider:
 * - Redis with TTL for automatic cleanup
 * - PostgreSQL with event sourcing patterns
 * - DynamoDB for serverless deployments
 */
export declare class InMemoryEventStore implements EventStore {
    private events;
    /**
     * Generates a unique event ID for a given stream ID
     */
    private generateEventId;
    /**
     * Extracts the stream ID from an event ID
     */
    private getStreamIdFromEventId;
    /**
     * Stores an event with a generated event ID
     * Implements EventStore.storeEvent
     */
    storeEvent(streamId: StreamId, message: JSONRPCMessage): Promise<EventId>;
    /**
     * Replays events that occurred after a specific event ID
     * Implements EventStore.replayEventsAfter
     */
    replayEventsAfter(lastEventId: EventId, { send }: {
        send: (eventId: EventId, message: JSONRPCMessage) => Promise<void>;
    }): Promise<StreamId>;
}
//# sourceMappingURL=eventStore.d.ts.map