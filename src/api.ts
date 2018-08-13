import { Grade, Receipt } from './home/models';
import { ImageAsset } from '../assets/images';

const savedReceipt = {
  dateCaptured: (new Date()).getTime(),
  id: 'TransitonExample', title: 'June 24th', grade: Grade.D,
  supermarket: {
    name: 'Safeway'
  },
  picture: ImageAsset.DEMO_RECEIPT,
  receiptItems: [
    {
      id: 1,
      company: {
        name: 'General Mills',
        grade: Grade.C
      },
      item: 'Cinn Toast Crunch'
    },
    {
      id: 2,
      company: {
        name: 'Lucrene',
        grade: Grade.F
      },
      item: 'Milk 1%'
    },
    {
      id: 3,
      company: {
        name: 'Dannon',
        grade: Grade.D
      },
      item: 'Oikos Vanil'
    },
    {
      id: 4,
      company: {
        name: 'Lucrene',
        grade: Grade.F,
        prediction: true
      },
      item: 'Ground Beef'
    },
    {
      id: 5,
      company: {
        name: 'Lucrene',
        grade: Grade.F,
        prediction: true
      },
      item: 'Loin Chops'
    },
    {
      id: 6,
      company: {
        name: 'Lucrene',
        grade: Grade.F,
        prediction: true
      },
      item: 'Chicken Breast'
    },
    {
      id: 7,
      company: {
        name: 'Signature Farms, Safeway',
        grade: Grade.C,
      },
      item: 'Avocado'
    },
    {
      id: 8,
      company: {
        name: 'Lucrene',
        grade: Grade.F,
        prediction: true
      },
      item: 'Broccoli'
    },
    {
      id: 9,
      company: {
        name: 'Lucrene',
        grade: Grade.F,
        prediction: true
      },
      item: 'Honeycrisp Apples'
    },
  ]
}

export default class ShopScanApi {
  public static getRecentUpdates = () => {
    return [
      { title: 'AB InBev', description: 'Conflict minerals rating', grade: Grade.F },
      { title: 'Kellogg Company', description: 'Promotion of GE in USA', grade: Grade.C },
      { title: 'Coca-Cola Amatil', description: 'Irresponsible marketing', grade: Grade.F }
    ]
  }

  public static postAndProcessReceipt = async (imageData: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return new Receipt(savedReceipt)
  }

  public static getReceiptHistory = () => {
    return [
      new Receipt(savedReceipt),
      new Receipt({
        dateCaptured: (new Date()).getTime(),
        id: 'boo',
        title: 'June 24th',
        grade: Grade.F,
        picture: ImageAsset.SAMPLE_RECEIPT,
        supermarket: {
          name: 'Bugenvila'
        },
        receiptItems: [
          {
            id: 1,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 2,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 3,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 4,
            company: {
              name: 'Whole Foods',
              grade: Grade.F
            },
            item: 'Corona Beer'
          }
        ]
      }),
      new Receipt({
        dateCaptured: (new Date()).getTime(),
        id: 'm',
        title: 'June 24th',
        grade: Grade.A,
        picture: ImageAsset.WHOLE_FOODS_RECEIPT,
        supermarket: {
          name: 'Whole Foods'
        },
        receiptItems: [
          {
            id: 1,
            company: {
              name: 'Whole Foods',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 2,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 3,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          },
          {
            id: 4,
            company: {
              name: 'ABInBev',
              grade: Grade.F
            },
            item: 'Corona Beer'
          }
        ]
      }
      )]
  }

  public static getRandomTip = () => {
    const possibleTips = [
      "ABInBev recently donated 1 million to abusive animals organizations?",
      "Whole Foods has supported over 10,000 minority children through high school?"
    ]
    return possibleTips[Math.floor(Math.random() * possibleTips.length)];
  }
}