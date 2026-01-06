import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app, conn } from './express.cjs';

describe('Test Vitest', ()=>{
    // Creates a suite of tests, allowing for grouping and hierarchical organization of tests.

    it('tests if 2+3=5', ()=>{
        // Defines a test case with a given name and test function.

        expect(2+3).toBe(5);
        // Checks that a value is what you expect. It calls Object.is to compare values. Don't use toBe with floating-point numbers.
    })
})

describe('Imports', ()=>{
    it('validates imports existence', ()=>{
        expect(app).not.toBeNull();
        expect(conn).not.toBeNull();
    })
})

describe('Mueslis Endpoints', () => {
    beforeEach(() => {
        // Registers a callback function to be executed before each test within the current suite.

        vi.restoreAllMocks();
        /* Calls .mockRestore() on every mocked function.
            This will empty .mock state, restore all original mock implementations, and restore original descriptors of spied-on objects.
            This is useful for inter-test cleanup and/or removing mocks created by vi.spyOn(...). */
    });

    it('GET /mueslis returns mueslis list', async () => {

    })

    it('POST /mueslis creates with valid data', async () => {

    })

    it('POST /mueslis rejects invalid data', async () => {

    })

    it('PATCH /mueslis updates fields', async () => {

    })

    it('PATCH /mueslis handles invalid price', async () => {

    })
})