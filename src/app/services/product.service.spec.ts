import { TestBed } from "@angular/core/testing"
import { ProductsService } from "./products.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { environment } from "./../../environments/environment";
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { faker } from "@faker-js/faker";
import { HTTP_INTERCEPTORS, HttpStatusCode } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { TokenService } from "./token.service";



describe('ProductService', () => {

    let productService: ProductsService;
    let httpController: HttpTestingController;
    let tokenService :TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProductsService,
                TokenService,
                {
                    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
                }
            ],
        });

        productService = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    })

    afterEach(() => {
        httpController.verify();
    })

    it('should be create', () => {
        expect(productService).toBeTruthy();
    });


    describe("test GetAllSimple", () => {

        it("should return a product list", (doneFn) => {
            //aaa

            spyOn(tokenService,'getToken').and.returnValue('123');


            const mockData: Product[] = generateManyProducts(2);
            //arrange
            productService.getAllSimple().subscribe(products => {
                //assert
                expect(products.length).toEqual(mockData.length);
                expect(products).toEqual(mockData);

                doneFn();
            })
            //act
            const url = `${environment.API_URL}/api/v1/products`
            const req = httpController.expectOne(url);
            const headers = req.request.headers;
            expect(headers.get('Authorization')).toEqual('Bearer 123')
            req.flush(mockData);
            //assert
        })
    })


    describe("test GetAll", () => {

        it("should return a product list", (doneFn) => {
            //aaa
            const mockData: Product[] = generateManyProducts(3);
            //arrange
            productService.getAll().subscribe(products => {
                //assert
                expect(products.length).toEqual(mockData.length);
                doneFn();
            })
            //act
            const url = `${environment.API_URL}/api/v1/products`
            const req = httpController.expectOne(url);
            req.flush(mockData);

            //assert
        })

        it("should return a product list with taxes", (doneFn) => {
            //aaa
            const mockData: Product[] = [
                {
                    ...generateOneProduct(),
                    price: 100
                },
                {
                    ...generateOneProduct(),
                    price: 200
                },
                {
                    ...generateOneProduct(),
                    price: 0
                },
                {
                    ...generateOneProduct(),
                    price: -100
                }
            ];
            //arrange
            productService.getAll().subscribe(products => {
                //assert
                expect(products[0].taxes).toEqual(19);
                expect(products[1].taxes).toEqual(38);
                expect(products[2].taxes).toEqual(0);
                expect(products[3].taxes).toEqual(0);

                doneFn();
            })
            //act
            const url = `${environment.API_URL}/api/v1/products`
            const req = httpController.expectOne(url);
            req.flush(mockData);

        })


        it("should send query params with limit 10 and offset 3", (doneFn) => {
            //aaa
            const mockData: Product[] = generateManyProducts(3);
            const limit = 10;
            const offset = 3;
            //arrange
            productService.getAll(limit, offset).subscribe(products => {
                //assert
                expect(products.length).toEqual(mockData.length);
                doneFn();
            })
            //act
            const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            const params = req.request.params;
            expect(params.get('limit')).toEqual(limit.toString())
            expect(params.get('offset')).toEqual(`${offset}`)

            //assert
        })

    })


    describe("test for Create", () => {

        it("should return a new product", (doneFn) => {
            ///arrange
            const mockData = generateOneProduct();
            const dto: CreateProductDTO = {
                title: 'new product',
                price: 10,
                images: ["test"],
                description: "desc",
                categoryId: 12
            }
            ///act

            productService.create({ ...dto }).subscribe(resp => {
                expect(resp).toEqual(mockData)
                doneFn();
            })
            ///asser
            const url = `${environment.API_URL}/api/v1/products`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('POST');

        })
    })


    describe("test for update", () => {

        it("should return a updated product", (doneFn) => {
            ///arrange
            const mockData = generateOneProduct();
            const dto: UpdateProductDTO = {
                title: 'new product',
                price: 10
            }
            const id = 10;
            ///act
            productService.update(`${id}`, { ...dto }).subscribe(resp => {
                expect(resp).toEqual(mockData)
                doneFn();
            })
            ///asser
            const url = `${environment.API_URL}/api/v1/products/${id}`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            expect(req.request.body).toEqual(dto);
            expect(req.request.method).toEqual('PUT');
        })
    })

    describe("test for delete", () => {

        it("should return true if the element is deleted", (doneFn) => {
            ///arrange
            const mockData = true;
            const id = 10;
            ///act
            productService.delete(`${id}`).subscribe(resp => {
                expect(resp).toBe(mockData)
                doneFn();
            })
            ///asser
            const url = `${environment.API_URL}/api/v1/products/${id}`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('DELETE');
        })
    })


    describe("test for getOne", () => {
        it("should return a product", (doneFn) => {
            ///arrange
            const mockData = generateOneProduct();

            const id = 10;
            ///act
            productService.getOne(`${id}`).subscribe(resp => {
                expect(resp).toEqual(mockData)
                doneFn();
            })
            ///asser
            const url = `${environment.API_URL}/api/v1/products/${id}`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            expect(req.request.method).toEqual('GET');
        })

        it("should return the rigth msg when the status code is 404", (doneFn) => {
            ///arrange
            const msgError = '404 msg';
            const mockError = {
                status: HttpStatusCode.NotFound,
                statusText: msgError
            };

            const id = 10;
            ///act
            productService.getOne(`${id}`).subscribe(
                {
                    error: (error) => {
                        //assert
                        expect(error).toEqual('El producto no existe');
                        doneFn();

                    },
                },
            )
            const url = `${environment.API_URL}/api/v1/products/${id}`
            const req = httpController.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(msgError, mockError);
        })

        it("should return the rigth msg when the status code is 409", (doneFn) => {
            ///arrange
            const msgError = '409 msg';
            const mockError = {
                status: HttpStatusCode.Conflict,
                statusText: msgError
            };

            const id = 10;
            ///act
            productService.getOne(`${id}`).subscribe(
                {
                    error: (error) => {
                        //assert
                        expect(error).toEqual('Algo esta fallando en el server');
                        doneFn();

                    },
                },
            )
            const url = `${environment.API_URL}/api/v1/products/${id}`
            const req = httpController.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(msgError, mockError);
        })
    })

    it("should return the rigth msg when the status code is 401", (doneFn) => {
        ///arrange
        const msgError = '401 msg';
        const mockError = {
            status: HttpStatusCode.Unauthorized,
            statusText: msgError
        };

        const id = 10;
        ///act
        productService.getOne(`${id}`).subscribe(
            {
                error: (error) => {
                    //assert
                    expect(error).toEqual('No estas permitido');
                    doneFn();

                },
            },
        )
        const url = `${environment.API_URL}/api/v1/products/${id}`
        const req = httpController.expectOne(url);
        expect(req.request.method).toEqual('GET');
        req.flush(msgError, mockError);
    })

    it("should return the rigth msg when the status code is another", (doneFn) => {
        ///arrange
        const msgError = '403 msg';
        const mockError = {
            status: HttpStatusCode.Forbidden,
            statusText: msgError
        };

        const id = 10;
        ///act
        productService.getOne(`${id}`).subscribe(
            {
                error: (error) => {
                    //assert
                    expect(error).toEqual('Ups algo salio mal');
                    doneFn();

                },
            },
        )
        const url = `${environment.API_URL}/api/v1/products/${id}`
        const req = httpController.expectOne(url);
        expect(req.request.method).toEqual('GET');
        req.flush(msgError, mockError);
    })

})


