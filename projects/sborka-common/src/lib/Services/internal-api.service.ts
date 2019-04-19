import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

import {isObject} from 'util';
import {ElementTableBlock} from '../Entity/element-table-block';
import {ElementTableElement} from '../Entity/element-table-element';
import {ElementTableOption} from '../Entity/element-table-option';
import {ElementTable} from '../Entity/element-table';
import {User} from '../Entity/user';
import {JwtResponse} from '../Entity/jwt-response';
import {Region} from '../Entity/region';
import {City} from '../Entity/city';
import {Typography} from '../Entity/typography';
import {MaterialGroup} from '../Entity/material-group';
import {Material} from '../Entity/material';
import {Size} from '../Entity/size';
import {PreparationWay} from '../Entity/preparation-way';
import {PreparationType} from '../Entity/preparation-type';
import {CategoryGroup} from '../Entity/category-group';
import {Category} from '../Entity/category';
import {ProductComponent} from '../Entity/product-component';
import {TypographyComponent} from '../Entity/typography-component';
import {Product} from '../Entity/product';
import {Price} from '../Entity/price';
import {PreparationDay} from '../Entity/preparation-day';
import {Circulation} from '../Entity/circulation';
import {FileUploaded} from '../Entity/file-uploaded';
import {ExclusionRule} from '../Entity/exclusion-rule';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class InternalApiService {
  public environment = {
    production: false,
    apiUrl: '/api/v1',
    imgUrl: '/api/media/'
  };

  constructor(private http: HttpClient) { }
  apiUrl = '';
  authSubject = new BehaviorSubject(false);

  // ElementTable
  private static filterElementTableBlocks(elementTableBlocks: ElementTableBlock[]) {
    elementTableBlocks = elementTableBlocks.filter(block => !ElementTableBlock.isEmpty(block));
    elementTableBlocks.map(block => {
      block.elementTableElements = block.elementTableElements.filter(element => !ElementTableElement.isEmpty(element));
      block.elementTableElements.map(element => {
        // @ts-ignore Ugly hack. Do not update component, only link it
        element.typographyComponent = isObject(element.typographyComponent) ? element.typographyComponent.id : null;

        element.elementCoefficients.map(coefficient => {
          coefficient.elementCoefficientElementItems.map(subElement => {
            // @ts-ignore Ugly hack. Do not update element, only link it
            subElement.element = isObject(subElement.element) ? subElement.element.id : null;
          });
        });

        element.elementTableBlocks = InternalApiService.filterElementTableBlocks(element.elementTableBlocks);
      });
    });

    return elementTableBlocks;
  }

  private static formElementTableData(elementTable: ElementTable) {
    const data = {
      name: elementTable.name,
      weight: elementTable.weight,
      product: elementTable.product.id,
      elementTableOptions: elementTable.elementTableOptions,
    };

    data.elementTableOptions = data.elementTableOptions.filter(item => !ElementTableOption.isEmpty(item));
    data.elementTableOptions.map(item => {
      item.elementTableBlocks = InternalApiService.filterElementTableBlocks(item.elementTableBlocks);
    });

    return data;
  }

  formUrl(methodUri) {
      return this.apiUrl + this.environment.apiUrl + methodUri;
  }

  public register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.formUrl('/login'), user).pipe(
      tap((res: JwtResponse) => {
        localStorage.setItem('ACCESS_TOKEN', res.token);
        this.authSubject.next(true);
      })
    );
  }

  public login(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.formUrl('/login_check'), user).pipe(
      tap(async (res: JwtResponse) => {
        localStorage.setItem('ACCESS_TOKEN', res.token);
        this.authSubject.next(true);
      })
    );
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  isAuthenticated() {
    return  this.authSubject.asObservable();
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.authSubject.next(false);
  }

  // Region
  public createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.formUrl('/regions'), region);
  }

  public updateRegion(region: Region) {
    return this.http.put<Region>(this.formUrl('/regions/' + region.id), region);
  }

  public deleteRegion(id: number) {
    return this.http.delete(this.formUrl('/regions/' + id));
  }

  public getRegion(id: number) {
    return this.http.get<Region>(this.formUrl('/regions/' + id));
  }

  public getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.formUrl('/regions'));
  }

  // City
  public createCity(city: City): Observable<City> {
    return this.http.post<City>(this.formUrl('/cities'), {
      name: city.name,
      region: city.region.id,
    });
  }

  public updateCity(city: City) {
    return this.http.put<City>(this.formUrl('/cities/' + city.id), {
      id: city.id,
      name: city.name,
      region: city.region.id,
    });
  }

  public deleteCity(id: number) {
    return this.http.delete(this.formUrl('/cities/' + id));
  }

  public getCity(id: number) {
    return this.http.get<City>(this.formUrl('/cities/' + id));
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.formUrl('/cities'));
  }

  // Typography
  public createTypography(typography: Typography): Observable<Typography> {
    return this.http.post<Typography>(this.formUrl('/typographies'), {
      name: typography.name,
      city: typography.city.id,
    });
  }

  public updateTypography(typography: Typography) {
    return this.http.put<Typography>(this.formUrl('/typographies/' + typography.id), {
      id: typography.id,
      name: typography.name,
      city: typography.city.id,
    });
  }

  public deleteTypography(id: number) {
    return this.http.delete(this.formUrl('/typographies/' + id));
  }

  public getTypography(id: number) {
    return this.http.get<Typography>(this.formUrl('/typographies/' + id));
  }

  public getTypographies(): Observable<Typography[]> {
    return this.http.get<Typography[]>(this.formUrl('/typographies'));
  }

  // MaterialGroup
  public createMaterialGroup(materialGroup: MaterialGroup): Observable<MaterialGroup> {
    return this.http.post<MaterialGroup>(this.formUrl('/material_groups'), materialGroup);
  }

  public updateMaterialGroup(materialGroup: MaterialGroup) {
    return this.http.put<MaterialGroup>(this.formUrl('/material_groups/' + materialGroup.id), materialGroup);
  }

  public deleteMaterialGroup(id: number) {
    return this.http.delete(this.formUrl('/material_groups/' + id));
  }

  public getMaterialGroup(id: number) {
    return this.http.get<MaterialGroup>(this.formUrl('/material_groups/' + id));
  }

  public getMaterialGroups(): Observable<MaterialGroup[]> {
    return this.http.get<MaterialGroup[]>(this.formUrl('/material_groups'));
  }

  // Material
  public createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.formUrl('/materials'), {
      name: material.name,
      materialGroup: material.materialGroup.id,
      density: material.density,
      thickness: material.thickness,
    });
  }

  public updateMaterial(material: Material) {
    return this.http.put<Material>(this.formUrl('/materials/' + material.id), {
      id: material.id,
      name: material.name,
      materialGroup: material.materialGroup.id,
      density: material.density,
      thickness: material.thickness,
    });
  }

  public deleteMaterial(id: number) {
    return this.http.delete(this.formUrl('/materials/' + id));
  }

  public getMaterial(id: number) {
    return this.http.get<Material>(this.formUrl('/materials/' + id));
  }

  public getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.formUrl('/materials'));
  }

  // Size
  public createSize(size: Size): Observable<Size> {
    return this.http.post<Size>(this.formUrl('/sizes'), size);
  }

  public updateSize(size: Size) {
    return this.http.put<Size>(this.formUrl('/sizes/' + size.id), size);
  }

  public deleteSize(id: number) {
    return this.http.delete(this.formUrl('/sizes/' + id));
  }

  public getSize(id: number) {
    return this.http.get<Size>(this.formUrl('/sizes/' + id));
  }

  public getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.formUrl('/sizes'));
  }

  // PreparationWay
  public createPreparationWay(preparationWay: PreparationWay): Observable<PreparationWay> {
    return this.http.post<PreparationWay>(this.formUrl('/preparation_ways'), preparationWay);
  }

  public updatePreparationWay(preparationWay: PreparationWay) {
    return this.http.put<PreparationWay>(this.formUrl('/preparation_ways/' + preparationWay.id), preparationWay);
  }

  public deletePreparationWay(id: number) {
    return this.http.delete(this.formUrl('/preparation_ways/' + id));
  }

  public getPreparationWay(id: number) {
    return this.http.get<PreparationWay>(this.formUrl('/preparation_ways/' + id));
  }

  public getPreparationWays(): Observable<PreparationWay[]> {
    return this.http.get<PreparationWay[]>(this.formUrl('/preparation_ways'));
  }

  // PreparationType
  public createPreparationType(preparationType: PreparationType): Observable<PreparationType> {
    return this.http.post<PreparationType>(this.formUrl('/preparation_types'), {
      name: preparationType.name,
      preparationWay: preparationType.preparationWay.id,
    });
  }

  public updatePreparationType(preparationType: PreparationType) {
    return this.http.put<PreparationType>(this.formUrl('/preparation_types/' + preparationType.id), {
      id: preparationType.id,
      name: preparationType.name,
      preparationWay: preparationType.preparationWay.id,
    });
  }

  public deletePreparationType(id: number) {
    return this.http.delete(this.formUrl('/preparation_types/' + id));
  }

  public getPreparationType(id: number) {
    return this.http.get<PreparationType>(this.formUrl('/preparation_types/' + id));
  }

  public getPreparationTypes(): Observable<PreparationType[]> {
    return this.http.get<PreparationType[]>(this.formUrl('/preparation_types'));
  }

  // CategoryGroup
  public createCategoryGroup(categoryGroup: CategoryGroup): Observable<CategoryGroup> {
    return this.http.post<CategoryGroup>(this.formUrl('/category_groups'), categoryGroup);
  }

  public updateCategoryGroup(categoryGroup: CategoryGroup) {
    return this.http.put<CategoryGroup>(this.formUrl('/category_groups/' + categoryGroup.id), categoryGroup);
  }

  public deleteCategoryGroup(id: number) {
    return this.http.delete(this.formUrl('/category_groups/' + id));
  }

  public getCategoryGroup(id: number) {
    return this.http.get<CategoryGroup>(this.formUrl('/category_groups/' + id));
  }

  public getCategoryGroups(): Observable<CategoryGroup[]> {
    return this.http.get<CategoryGroup[]>(this.formUrl('/category_groups'));
  }

  // Category
  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.formUrl('/categories'), {
      name: category.name,
      categoryGroup: category.categoryGroup.id,
      preparationType: category.preparationType.id,
    });
  }

  public updateCategory(category: Category) {
    return this.http.put<Category>(this.formUrl('/categories/' + category.id), {
      id: category.id,
      name: category.name,
      categoryGroup: category.categoryGroup.id,
      preparationType: category.preparationType.id,
    });
  }

  public deleteCategory(id: number) {
    return this.http.delete(this.formUrl('/categories/' + id));
  }

  public getCategory(id: number) {
    return this.http.get<Category>(this.formUrl('/categories/' + id));
  }

  public getCategories(filterParams: any = null): Observable<Category[]> {
    const paramKeys = {};
    if (filterParams && filterParams.categoryGroup) {
      paramKeys['categoryGroup.id'] = filterParams.categoryGroup;
    }
    const params = new HttpParams({fromObject: paramKeys});
    return this.http.get<Category[]>(this.formUrl('/categories'), {params});
  }

  // ProductComponent
  public createProductComponent(productComponent: ProductComponent): Observable<ProductComponent> {
    return this.http.post<ProductComponent>(this.formUrl('/components'), {
      preparationType: productComponent.preparationType.id,
      material: productComponent.material.id,
      size: productComponent.size.id,
      comment: productComponent.comment,
    });
  }

  public updateProductComponent(productComponent: ProductComponent) {
    return this.http.put<ProductComponent>(this.formUrl('/components/' + productComponent.id), {
      id: productComponent.id,
      preparationType: productComponent.preparationType.id,
      material: productComponent.material.id,
      size: productComponent.size.id,
      comment: productComponent.comment,
    });
  }

  public deleteProductComponent(id: number) {
    return this.http.delete(this.formUrl('/components/' + id));
  }

  public getProductComponent(id: number) {
    return this.http.get<ProductComponent>(this.formUrl('/components/' + id));
  }

  public getProductComponents(): Observable<ProductComponent[]> {
    return this.http.get<ProductComponent[]>(this.formUrl('/components'));
  }

  // TypographyComponent
  public createTypographyComponent(price: TypographyComponent): Observable<TypographyComponent> {
    return this.http.post<TypographyComponent>(this.formUrl('/typography_components'), {
      component: price.component.id,
      typography: price.typography.id,
    });
  }

  public updateTypographyComponent(price: TypographyComponent) {
    return this.http.put<TypographyComponent>(this.formUrl('/typography_components/' + price.id), {
      id: price.id,
      component: price.component.id,
      typography: price.typography.id,
    });
  }

  public deleteTypographyComponent(id: number) {
    return this.http.delete(this.formUrl('/typography_components/' + id));
  }

  public getTypographyComponent(id: number) {
    return this.http.get<TypographyComponent>(this.formUrl('/typography_components/' + id));
  }

  public getTypographyComponents(): Observable<TypographyComponent[]> {
    return this.http.get<TypographyComponent[]>(this.formUrl('/typography_components'));
  }

  public getTypographyComponentProducts(id: number) {
    return this.http.get<Product[]>(this.formUrl('/typography_components/' + id + '/products'));
  }

  // Price
  public createPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(this.formUrl('/prices'), {
      typographyComponent: price.typographyComponent.id,
      circulation: price.circulation,
      price: price.price,
      isUniversal: !!price.isUniversal,
    });
  }

  public updatePrice(price: Price) {
    return this.http.put<Price>(this.formUrl('/prices/' + price.id), {
      id: price.id,
      typographyComponent: price.typographyComponent.id,
      circulation: price.circulation,
      price: price.price,
      isUniversal: !!price.isUniversal,
    });
  }

  public deletePrice(id: number) {
    return this.http.delete(this.formUrl('/prices/' + id));
  }

  public getPrice(id: number) {
    return this.http.get<Price>(this.formUrl('/prices/' + id));
  }

  public getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.formUrl('/prices'));
  }

  // Product
  public createProduct(product: Product): Observable<Product> {
    product.preparationDays = product.preparationDays.filter(
      preparationDay => preparationDay.daysCount && preparationDay.coefficient
    );

    product.circulations = product.circulations.filter(
      circulation => circulation.circulation > 0
    );

    return this.http.post<Product>(this.formUrl('/products'), {
      name: product.name,
      category: product.category.id,
      size: product.size.id,
      sizeMin: product.sizeMin.id,
      sizeMax: product.sizeMax.id,
      sizeStep: product.sizeStep,
      icon: product.icon.id,
      template: product.template.id,
      isOutOnMonday: !!product.isOutOnMonday,
      isOutOnTuesday: !!product.isOutOnTuesday,
      isOutOnWednesday: !!product.isOutOnWednesday,
      isOutOnThursday: !!product.isOutOnThursday,
      isOutOnFriday: !!product.isOutOnFriday,
      isOutOnSaturday: !!product.isOutOnSaturday,
      isOutOnSunday: !!product.isOutOnSunday,
      lastOrderTime: product.lastOrderTime,
      preparationDays: product.preparationDays,
      circulations: product.circulations,
    });
  }

  public updateProduct(product: Product): Observable<Product> {
    product.preparationDays = product.preparationDays.filter(
      preparationDay => preparationDay.daysCount && preparationDay.coefficient
    );

    product.circulations = product.circulations.filter(
      circulation => circulation.circulation > 0
    );

    return this.http.put<Product>(this.formUrl('/products/' + product.id), {
      id: product.id,
      name: product.name,
      category: product.category.id,
      size: product.size.id,
      sizeMin: product.sizeMin.id,
      sizeMax: product.sizeMax.id,
      sizeStep: product.sizeStep,
      icon: product.icon.id,
      template: product.template.id,
      isOutOnMonday: !!product.isOutOnMonday,
      isOutOnTuesday: !!product.isOutOnTuesday,
      isOutOnWednesday: !!product.isOutOnWednesday,
      isOutOnThursday: !!product.isOutOnThursday,
      isOutOnFriday: !!product.isOutOnFriday,
      isOutOnSaturday: !!product.isOutOnSaturday,
      isOutOnSunday: !!product.isOutOnSunday,
      lastOrderTime: product.lastOrderTime,
      preparationDays: product.preparationDays,
      circulations: product.circulations,
    });
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.formUrl('/products/' + id));
  }

  public getProduct(id: number) {
    return this.http.get<Product>(this.formUrl('/products/' + id));
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.formUrl('/products'));
  }

  // PreparationDay
  public createPreparationDay(preparationDay: PreparationDay): Observable<PreparationDay> {
    preparationDay.id = null;
    return this.http.post<PreparationDay>(this.formUrl('/preparation_days'), preparationDay);
  }

  public updatePreparationDay(preparationDay: PreparationDay) {
    return this.http.put<PreparationDay>(this.formUrl('/preparation_days/' + preparationDay.id), preparationDay);
  }

  public deletePreparationDay(id: number) {
    return this.http.delete(this.formUrl('/preparation_days/' + id));
  }

  public getPreparationDay(id: number) {
    return this.http.get<PreparationDay>(this.formUrl('/preparation_days/' + id));
  }

  public getPreparationDays(): Observable<PreparationDay[]> {
    return this.http.get<PreparationDay[]>(this.formUrl('/preparation_days'));
  }

  // Circulation
  public createCirculation(circulation: Circulation): Observable<Circulation> {
    circulation.id = null;
    circulation.isVisible = !!circulation.isVisible;

    return this.http.post<Circulation>(this.formUrl('/circulations'), circulation);
  }

  public updateCirculation(circulation: Circulation) {
    circulation.isVisible = !!circulation.isVisible;

    return this.http.put<Circulation>(this.formUrl('/circulations/' + circulation.id), circulation);
  }

  public deleteCirculation(id: number) {
    return this.http.delete(this.formUrl('/circulations/' + id));
  }

  public getCirculation(id: number) {
    return this.http.get<Circulation>(this.formUrl('/circulations/' + id));
  }

  public getCirculations(): Observable<Circulation[]> {
    return this.http.get<Circulation[]>(this.formUrl('/circulations'));
  }

  public createElementTable(elementTable: ElementTable): Observable<ElementTable> {
    const data = InternalApiService.formElementTableData(elementTable);
    data['isDropdown'] = false;
    data['isExpand'] = false;
    data['isVisible'] = false;

    return this.http.post<ElementTable>(this.formUrl('/element_tables'), data);
  }

  public updateElementTable(elementTable: ElementTable) {
    const data = InternalApiService.formElementTableData(elementTable);
    data['id'] = elementTable.id;

    return this.http.put<ElementTable>(this.formUrl('/element_tables/' + elementTable.id), data);
  }

  public updateVisibilityFlags(elementTable: ElementTable): Observable<ElementTable> {
    return this.http.put<ElementTable>(this.formUrl('/element_tables/' + elementTable.id), {
      id: elementTable.id,
      isDropdown: !!elementTable.isDropdown,
      isExpand: !!elementTable.isExpand,
      isVisible: !!elementTable.isVisible,
    });
  }

  public deleteElementTable(id: number) {
    return this.http.delete(this.formUrl('/element_tables/' + id));
  }

  public getElementTable(id: number) {
    return this.http.get<ElementTable>(this.formUrl('/element_tables/' + id));
  }

  public getElementTables(productId: number): Observable<ElementTable[]> {
    const options = {params: {'product.id': '' + productId}};
    return this.http.get<ElementTable[]>(this.formUrl('/element_tables'), options);
  }

  // Upload
  public upload(file: File): Observable<FileUploaded> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<FileUploaded>(this.formUrl('/media_objects'), formData);
  }

  // ExclusionRule
  public createExclusionRule(productId: number, exclusionRule: ExclusionRule): Observable<ExclusionRule> {
    return this.http.post<ExclusionRule>(this.formUrl('/exclusion_rules'), {
      comment: exclusionRule.comment,
      items: exclusionRule.items.map(item => {
        return {
          id: item.id,
          element: item.element.id,
          isAndOperator: item.isAndOperator,
        };
      }),
      product: productId,
    });
  }

  public updateExclusionRule(productId: number, exclusionRule: ExclusionRule) {
    return this.http.put<ExclusionRule>(this.formUrl('/exclusion_rules/' + exclusionRule.id), {
      id: exclusionRule.id,
      comment: exclusionRule.comment,
      items: exclusionRule.items.map(item => {
        return {
          id: item.id,
          element: item.element.id,
          isAndOperator: item.isAndOperator,
        };
      }),
      product: productId,
    });
  }

  public deleteExclusionRule(id: number) {
    return this.http.delete(this.formUrl('/exclusion_rules/' + id));
  }

  public getExclusionRule(id: number) {
    return this.http.get<ExclusionRule>(this.formUrl('/exclusion_rules/' + id));
  }
}
