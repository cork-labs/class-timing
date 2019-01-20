import * as chai from 'chai';
import 'mocha';
import 'sinon';
import sinonChai from 'sinon-chai';

import { Timing } from './index';

const expect = chai.expect;
chai.use(sinonChai);

describe('class-timing', function t () {
  it('should export the expected symbols', function t () {
    expect(Timing).to.be.a('function');
  });
});
