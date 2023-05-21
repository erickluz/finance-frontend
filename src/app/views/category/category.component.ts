import { Component } from '@angular/core';
import {ListItens} from '../list.itens';
import { Category } from 'src/app/model/category.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from "../category.service";
import { FilterPipe } from '../filter.pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  listItens : ListItens = new ListItens();
  visible = false;
  idCategoryDelete : number = 0;
  public visibleModalForm = false;
  private category : Category = new Category("", "");
  public visibleModalDelete = false;
  errorMessage: string = '';
  categories : Category[] = [];
  save: boolean = false;

  public formCategory : FormGroup = this.formBuilder.group({
    id: [this.category.id],
    name: [this.category.name]
  });

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private filter: FilterPipe) {
    this.listItens.list = this.category;
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.get()
    .subscribe({
      next: this.handleCategoriesResponse.bind(this),
      error: this.handleError.bind(this)
   });

  }

  handleCategoriesResponse(categories: Category[]) {
    this.categories = categories;
    this.listItens.list = categories;
  }

  handleError(error: HttpErrorResponse) {
    this.errorMessage = error.statusText;
    this.visible = !this.visible;
  }

  newCategory() {

  }

  toggleLiveDemo() {
    this.visibleModalForm = !this.visibleModalForm;
  }

  sizeList(list : any[] | undefined) : number {
    if (list === undefined) {
      return 0
    } else {
      return list.length;
    }
  }

  public editCategory(id: string) {
    this.categoryService.findById(+id).subscribe(
      (category) => {
        this.category = category;
        this.createForm(category);
        this.visibleModalForm = true;
      });
  }

  public toggleModalDelete(id: string) {
    if (id) {
      this.idCategoryDelete = +id;
    }
    this.visibleModalDelete = !this.visibleModalDelete;
  }

  createForm(category: Category) {
    this.formCategory = this.formBuilder.group({
      id: [category.id],
      name: [category.name]
    });
  }

  public onSubmit() {
    this.categoryService.post(this.formCategory.value)
    .subscribe(() => {
      this.save = true;
      this.getCategories();
    })
    this.formCategory.reset();
  }

  handleLiveDemoChange(event: any) {
    this.visibleModalForm = event;
  }

  public deleteCategory() {
    this.categoryService.delete(this.idCategoryDelete).subscribe(
      () => {
        this.getCategories();
      }
    );
  }

  handleModalDelete(event: any) {
    this.visibleModalDelete = event;
  }
}
