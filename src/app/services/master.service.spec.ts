
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service'
describe('MasterService', () => {
  let service: MasterService;




  it("should return 'my value' from the real service", () => {
    const valueService = new ValueService();
    const service = new MasterService(valueService);
    expect(service.getValue()).toBe('my value')
  })

  it("should return 'other value' from the fake service", () => {
    const fakeValueService = new FakeValueService();
    const service = new MasterService(fakeValueService as unknown as ValueService);
    expect(service.getValue()).toBe('fake value')
  })

  it("should call to get value from valueService", () => {

    const valueServiceSpy = jasmine.createSpyObj("ValueService", ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const service = new MasterService(valueServiceSpy);
    expect(service.getValue()).toBe("fake value")
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  })
});
