export class SnapCarouselItem {
  public title?: string
  public description?: string
  public grade?: Grade
}

export class Receipt {
  public id: string
  public title?: string
  public grade?: Grade
  public receiptItems: ReceiptItem[] = []
  private companies?: Set<Company>
  public dateCaptured?: Date
  public supermarket?: Company
  public picture?: any

  constructor(json: any) {
    Object.assign(this, json)
  }

  public getCompanies() {
    if (this.companies) return this.companies

    var companies = new Set();
    this.receiptItems.forEach((item: ReceiptItem) => {
      companies.add(item.company.name)
    })
    this.companies = companies
    return companies
  }
}


class Company {
  public name: string
  public grade: Grade
  public prediction: boolean
}

class ReceiptItem {
  public id: number
  public company: Company
  public item: string
}

export class GradeColorManager {
  public static getColorForGrade(grade: Grade) {
    switch (grade) {
      case Grade.A: return 'rgba(106, 176, 76, 1)'
      case Grade.B: return 'rgba(186, 220, 88, 1)'
      case Grade.C: return 'rgba(249, 202, 36, 1)'
      case Grade.D: return 'rgba(240, 147, 43, 1)'
      case Grade.F: return 'rgba(235, 77, 75, 1)'
      default: return 'red'
    }
  }

  public static getBackgroundColorForGrade(grade?: Grade) {
    switch (grade) {
      case Grade.A: return 'rgba(106, 176, 76, 0.6)'
      case Grade.B: return 'rgba(186, 220, 88, 0.6)'
      case Grade.C: return 'rgba(249, 202, 36, 0.6)'
      case Grade.D: return 'rgba(240, 147, 43, 0.6)'
      case Grade.F: return 'rgba(235, 77, 75, 0.6)'
      default: return 'lightblue'
    }
  }
}

export enum Grade {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  F = 'f'
}