import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';
import { faker } from '@faker-js/faker';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  })

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test login', () => {
    it("should return token", (doneFn) => {
      //aaa

      const mockData: Auth = {
        access_token: "12312312"
      };
      const email = "esaar@asd.com";
      const password = "12345";

      //arrange
      authService.login(email,password).subscribe(token => {
        //assert
        expect(token).toEqual(mockData);
        doneFn();
      })
      //act
      const url = `${environment.API_URL}/api/v1/auth/login`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })

    it("should return token saved in token service", (doneFn) => {
      //aaa

      spyOn(tokenService,'saveToken').and.callThrough();


      const mockData: Auth = {
        access_token: "12312312"
      };
      const email = "esaar@asd.com";
      const password = "12345";

      //arrange
      authService.login(email,password).subscribe(token => {
        //assert
        expect(token).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith('12312312');
        doneFn();
      })
      //act
      const url = `${environment.API_URL}/api/v1/auth/login`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })



  })




});
