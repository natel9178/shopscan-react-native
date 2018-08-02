export class SnapCarouselItem {
  public title?: string
  public description?: string
  public grade?: Grade
}

export class Receipt {
  public id: string
  public title?: string
  public grade?: Grade
}

export class GradeColorManager {
  public static getColorForGrade(grade: Grade) {
    switch (grade) {
      case Grade.A: return 'lightgreen'
      case Grade.B: return 'green'
      case Grade.C: return 'orange'
      case Grade.D: return 'orangered'
      default: return 'red'
    }
  }

  public static getBackgroundColorForGrade(grade?: Grade) {
    switch (grade) {
      case Grade.A: return 'lightgreen'
      case Grade.B: return 'green'
      case Grade.C: return 'orange'
      case Grade.D: return 'orangered'
      case Grade.F: return 'red'
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