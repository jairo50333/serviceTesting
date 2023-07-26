
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service'
import { TestBed } from "@angular/core/testing"

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj("ValueService",['getValue'])

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }

      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  })

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  });

  // it("should return 'my value' from the real service", () => {
  //   const valueService = new ValueService();
  //   const service = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value')
  // })

  // it("should return 'other value' from the fake service", () => {
  //   const fakeValueService = new FakeValueService();
  //   const service = new MasterService(fakeValueService as unknown as ValueService);
  //   expect(service.getValue()).toBe('fake value')
  // })

  it("should call to get value from valueService", () => {

    valueServiceSpy.getValue.and.returnValue('fake value');
    const service = new MasterService(valueServiceSpy);

    expect(masterService.getValue()).toBe("fake value")
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  })
});
