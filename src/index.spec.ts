import * as chai from 'chai';
import 'mocha';
import 'sinon';
import sinonChai from 'sinon-chai';

import { Timing } from '.';

const expect = chai.expect;
chai.use(sinonChai);

describe('package: class-timing', function t () {
  it('should export the expected symbols', function t () {
    expect(Timing).to.be.a('function');
  });
});
