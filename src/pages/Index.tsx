import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type RoofingType = {
  id: string;
  name: string;
  icon: string;
  description: string;
  materials: Material[];
};

type Material = {
  id: string;
  name: string;
  category: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  ourPrice: number;
  competitorPrices: { company: string; price: number }[];
  unit: string;
  image?: string;
};

const roofingTypes: RoofingType[] = [
  {
    id: 'tile',
    name: 'Черепичная кровля',
    icon: 'Home',
    description: 'Керамическая и цементно-песчаная черепица',
    materials: [
      {
        id: 'ceramic-tiles',
        name: 'Керамическая черепица',
        category: 'Покрытие',
        products: [
          {
            id: 'ceramic-classic',
            name: 'Керамическая черепица Классик',
            description: 'Натуральная керамическая черепица высокого качества',
            ourPrice: 1200,
            competitorPrices: [
              { company: 'Конкурент А', price: 1350 },
              { company: 'Конкурент Б', price: 1280 }
            ],
            unit: 'м²'
          }
        ]
      },
      {
        id: 'mounting',
        name: 'Крепеж',
        category: 'Монтаж',
        products: [
          {
            id: 'roof-hooks',
            name: 'Кровельные крюки',
            description: 'Крепежные элементы для черепичной кровли',
            ourPrice: 45,
            competitorPrices: [
              { company: 'Конкурент А', price: 52 },
              { company: 'Конкурент Б', price: 48 }
            ],
            unit: 'шт'
          }
        ]
      }
    ]
  },
  {
    id: 'metal',
    name: 'Металлочерепица',
    icon: 'Layers',
    description: 'Профилированные металлические листы',
    materials: [
      {
        id: 'metal-sheets',
        name: 'Листы металлочерепицы',
        category: 'Покрытие',
        products: [
          {
            id: 'metal-classic',
            name: 'Металлочерепица Монтеррей',
            description: 'Стальная металлочерепица с полимерным покрытием',
            ourPrice: 580,
            competitorPrices: [
              { company: 'Конкурент А', price: 620 },
              { company: 'Конкурент Б', price: 605 }
            ],
            unit: 'м²'
          }
        ]
      }
    ]
  },
  {
    id: 'corrugated',
    name: 'Профнастил',
    icon: 'Grid3X3',
    description: 'Профилированный настил для кровли',
    materials: [
      {
        id: 'corrugated-sheets',
        name: 'Листы профнастила',
        category: 'Покрытие',
        products: [
          {
            id: 'corrugated-c21',
            name: 'Профнастил С-21',
            description: 'Оцинкованный профнастил для кровельных работ',
            ourPrice: 420,
            competitorPrices: [
              { company: 'Конкурент А', price: 450 },
              { company: 'Конкурент Б', price: 435 }
            ],
            unit: 'м²'
          }
        ]
      }
    ]
  },
  {
    id: 'soft',
    name: 'Мягкая кровля',
    icon: 'Waves',
    description: 'Битумная черепица и рулонные материалы',
    materials: [
      {
        id: 'bitumen-tiles',
        name: 'Битумная черепица',
        category: 'Покрытие',
        products: [
          {
            id: 'soft-shingles',
            name: 'Гибкая черепица Стандарт',
            description: 'Битумная черепица с базальтовой посыпкой',
            ourPrice: 380,
            competitorPrices: [
              { company: 'Конкурент А', price: 410 },
              { company: 'Конкурент Б', price: 395 }
            ],
            unit: 'м²'
          }
        ]
      }
    ]
  }
];

const Index = () => {
  const [selectedType, setSelectedType] = useState<RoofingType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else if (selectedMaterial) {
      setSelectedMaterial(null);
    } else {
      setSelectedType(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getSavingsPercentage = (ourPrice: number, competitorPrice: number) => {
    return Math.round(((competitorPrice - ourPrice) / competitorPrice) * 100);
  };

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack} className="p-2">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h1>
                <p className="text-gray-600">{selectedType?.name} → {selectedMaterial?.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Описание товара</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Единица измерения:</span>
                    <Badge variant="outline">{selectedProduct.unit}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingDown" size={20} className="text-green-600" />
                    Сравнение цен
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-semibold text-green-800">Наша цена</p>
                        <p className="text-2xl font-bold text-green-900">
                          {formatPrice(selectedProduct.ourPrice)}
                        </p>
                      </div>
                      <Badge className="bg-green-600">
                        Лучшая цена
                      </Badge>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Цены конкурентов</h4>
                      {selectedProduct.competitorPrices.map((competitor, index) => {
                        const savings = getSavingsPercentage(selectedProduct.ourPrice, competitor.price);
                        return (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">{competitor.company}</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {formatPrice(competitor.price)}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-green-600">
                              +{savings}%
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack} className="p-2">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedMaterial.name}</h1>
                <p className="text-gray-600">{selectedType?.name} → {selectedMaterial.category}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedMaterial.products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(product.ourPrice)}
                      </span>
                      <Badge variant="outline">{product.unit}</Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>Конкуренты:</p>
                      {product.competitorPrices.map((comp, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{comp.company}</span>
                          <span className="line-through">{formatPrice(comp.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack} className="p-2">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedType.name}</h1>
                <p className="text-gray-600">{selectedType.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedType.materials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedMaterial(material)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Package" size={20} />
                    {material.name}
                  </CardTitle>
                  <CardDescription>{material.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {material.products.length} товар{material.products.length === 1 ? '' : material.products.length < 5 ? 'а' : 'ов'}
                    </p>
                    <div className="text-sm">
                      <p className="font-medium">Цены от:</p>
                      <p className="text-green-600 font-semibold">
                        {formatPrice(Math.min(...material.products.map(p => p.ourPrice)))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <img 
              src="/img/bc2d316b-71b5-46ef-a400-c4fe64818a6f.jpg" 
              alt="Каталог кровельных материалов" 
              className="w-full max-w-2xl mx-auto mb-8 rounded-lg shadow-lg"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Каталог кровельных материалов</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Профессиональный инструмент для менеджеров. Выберите тип кровли и найдите лучшие предложения.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roofingTypes.map((type) => (
            <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedType(type)}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name={type.icon} size={32} className="text-blue-600" />
                </div>
                <CardTitle className="text-xl">{type.name}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {type.materials.length} категори{type.materials.length === 1 ? 'я' : type.materials.length < 5 ? 'и' : 'й'} материалов
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">
                      Экономия до 15%
                    </span>
                    <Icon name="ArrowRight" size={16} className="text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;