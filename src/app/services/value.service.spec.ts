import { ValueService } from './value.service';
import { TestBed } from "@angular/core/testing"

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ValueService]

    });
    service = TestBed.inject(ValueService);
  })

  it('should be create', () => {
    expect(service).toBeTruthy();
  });


  describe('test for get Value', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe("my value");
    });
  })


  describe('test for set Value', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe("my value");
      service.setValue("change")
      expect(service.getValue()).toBe("change");
    });
  })


  describe('test for getPromiseValue', () => {
    it('should return "promise value" from promise', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe("promise value")
        doneFn()
      });
    });

    it('should return "promise value" from promise', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe("promise value")

    })


  })


  describe('test for getObservableValue', () => {
    it('should return "obs value" from promise', (doneFn) => {
      service.getObservableValue().subscribe(rta => {
        expect(rta).toBe("obs value");
        doneFn();

      })
    });
  })

});
