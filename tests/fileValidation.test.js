import test from 'node:test';
import assert from 'node:assert/strict';
import { isPRDRFileName } from '../src/utils/fileValidation.js';

test('accepts PRDR files without an extension', () => {
    assert.equal(isPRDRFileName('PRDR31155361589_1'), true);
    assert.equal(isPRDRFileName('prdr_example'), true);
});

test('rejects non-PRDR files and PRDR files with extensions', () => {
    assert.equal(isPRDRFileName('photo.jpg'), false);
    assert.equal(isPRDRFileName('README'), false);
    assert.equal(isPRDRFileName('PRDR31155361589_1.txt'), false);
});

test('rejects invalid filename values', () => {
    assert.equal(isPRDRFileName(''), false);
    assert.equal(isPRDRFileName('   '), false);
    assert.equal(isPRDRFileName(null), false);
});
