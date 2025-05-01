import miksy from '../assets/miksy.png';
import miksyBig from '../assets/miksyBig.png';
import vidy from '../assets/vidy.png';
import vidyBig from '../assets/vidyBig.png';
import korm from '../assets/korm.png';
import kormBig from '../assets/kormBig.jpg';
import comp from '../assets/comp.png';
import compBig from '../assets/compBig.jpg';
import gnezdo from '../assets/gnezdo.png';
import gnezdoBig from '../assets/gnezdoBig.jpg';
import bird from '../assets/bird.png';
import birdBig from '../assets/birdBig.png';
import eagle from '../assets/eagle.jpg';
import eagleBig from '../assets/eagleBig.jpg';
import yastreb from '../assets/yastreb.jpg';
import yastrebBig from '../assets/yastrebBig.jpg';
import woody from '../assets/woody.jpg';
import woodyBig from '../assets/woodyBig.jpg';
import vorona from '../assets/vorona.jpg';
import voronaBig from '../assets/voronaBig.jpg';
import snegir from '../assets/snegir.jpg';
import snegirBig from '../assets/snegirBig.jpg';
import golub from '../assets/golub.jpg';
import golubBig from '../assets/golubBig.jpg';
import sinica from '../assets/sinica.jpg';
import sinicaBig from '../assets/sinicaBig.jpg';
import skvorec from '../assets/skvorec.jpg';
import skvorecBig from '../assets/skvorecBig.jpg';
import lastochka from '../assets/lastochka.jpg';
import lastochkaBig from '../assets/lastochkaBig.jpg';
import yachmen from '../assets/yachmen.jpg';
import yachmenBig from '../assets/yachmenBig.jpg';
import kukuruza from '../assets/kukuruza.jpg';
import kukuruzaBig from '../assets/kukuruzaBig.jpg';
import len from '../assets/len.jpg';
import lenBig from '../assets/lenBig.jpg';
import pshenica from '../assets/pshenica.jpg';
import pshenicaBig from '../assets/pshenicaBig.png';
import proso from '../assets/proso.jpg';
import prosoBig from '../assets/prosoBig.jpg';
import sorgo from '../assets/sorgo.jpg';
import sorgoBig from '../assets/sorgoBig.jpg';
import forBird from '../assets/forBirds1.png';
import forBird1 from '../assets/forBirds2.png';
import forBird2 from '../assets/forBirds3.png';
import forBird3 from '../assets/forBirds4.png';

interface RelatedBird {
  id: number;
  name: string;
  image: string;
}

interface RelatedGrain {
  id: number;
  name: string;
  image: string;
}

interface RelatedMix {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedBirds?: RelatedBird[];
  grains?: RelatedGrain[];
  materials?: string[];
  recommendedBirds?: RelatedBird[];
  includes?: string[];
  targetBirds?: RelatedBird[];
  suitableFor?: RelatedBird[];
}

interface Bird {
  id: number;
  name: string;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedGrains?: RelatedGrain[];
  relatedMixes?: RelatedMix[];
}

interface Grain {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  pageDescription: string[];
  image: string;
  imageBig: string;
  relatedBirds: RelatedBird[];
  relatedMixes: RelatedMix[];
}

interface Products {
  'gotovye-miksy': Product[];
  'otdelnye-vidy-kormov': Product[];
  kormushki: Product[];
  'gotovye-komplekty': Product[];
  'aksessuary-i-drugoe': Product[];
  bird: Bird[];
  grains: Grain[];
}

export const products: Products = {
  'gotovye-miksy': [
    {
      id: 1,
      name: 'PADOVAN OVOMIX GOLD ROSSO',
      basePrice: 228,
      description: 'Корм для птиц',
      pageDescription: [
        'Дополнительный пюреобразный пигментирующий корм, для птенцов с красным оперением.',
        'Отлично подходит для увеличения поступления питательных веществ на особенных этапах жизни зерноядных птиц (при линьке и размножении), а также в периоды, когда животное испытывает стресс.',
      ],
      image: miksy,
      imageBig: miksyBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      grains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
    },
  ],
  'otdelnye-vidy-kormov': [
    {
      id: 1,
      name: 'Корм для птиц RIO Линька',
      basePrice: 200,
      description: 'Для волнистых попугайчиков',
      pageDescription: [
        'Корм RIO Линька разработан специально для волнистых попугайчиков в период линьки.',
        'Содержит комплекс витаминов A, D3, E, B1 и B12, а также минералы и жирные кислоты для восстановления яркости оперения и укрепления иммунитета.',
        'Идеально подходит для ежедневного кормления в течение всего периода линьки.',
      ],
      image: vidy,
      imageBig: vidyBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 8, name: 'Орёл степной', image: eagle },
        { id: 7, name: 'Ястреб', image: yastreb },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      grains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
    },
  ],
  kormushki: [
    {
      id: 1,
      name: 'Комплект-агро "Избушка на курьих ножках"',
      basePrice: 1000,
      description: 'Оригинальная кормушка для птиц',
      pageDescription: [
        'Компактная кормушка "Избушка на курьих ножках" идеально подходит для садовых птиц.',
        'Имеет крышу, защищающую корм от осадков, и удобную платформу для посадки птиц.',
      ],
      image: korm,
      imageBig: kormBig,
      materials: [
        'Дерево',
        'Верёвка для подвеса',
        'Экологичное покрытие от влаги',
      ],
      recommendedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
    },
  ],
  'gotovye-komplekty': [
    {
      id: 1,
      name: 'Корм для птиц RIO Линька',
      basePrice: 1000,
      description: 'Для волнистых попугайчиков',
      pageDescription: [
        'Готовый комплект RIO Линька включает всё необходимое для заботы о волнистых попугайчиках в период линьки.',
        'В набор входит: корм RIO Линька, витамины, минеральный камень и зеркальце-игрушка.',
        'Подходит как для новичков, так и для опытных заводчиков.',
      ],
      image: comp,
      imageBig: compBig,
      includes: [
        'Корм RIO Линька (500г)',
        'Витаминный комплекс',
        'Минеральный камень',
        'Зеркальце',
      ],
      targetBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 8, name: 'Орёл степной', image: eagle },
        { id: 7, name: 'Ястреб', image: yastreb },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
    },
  ],
  'aksessuary-i-drugoe': [
    {
      id: 1,
      name: 'Домик для птиц TRIOL из кокоса',
      basePrice: 1000,
      description: 'Уютная кормушка, выполненная из натурального кокоса.',
      pageDescription: [
        'Домик TRIOL из кокоса — уютное, естественное убежище для птиц, сделанный из натуральной скорлупы кокоса.',
        'Легко подвешивается в клетке или на дереве. Идеально подходит как гнездо или игровое место.',
        'Безопасный и долговечный, не содержит токсичных материалов.',
      ],
      image: gnezdo,
      imageBig: gnezdoBig,
      materials: ['Кокос', 'Джутовая верёвка'],
      suitableFor: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
    },
  ],
  bird: [
    {
      id: 1,
      name: 'Домовый воробей',
      description: 'Маленькая городская птица',
      pageDescription: [
        'Воробей – это птица, знакомая всем, как взрослым, так и детям. Это небольшая птица, которая, на первый взгляд, имеет монотонный серо-коричневый окрас оперения, но, если внимательно присмотреться, то можно обнаружить более контрастные тона, больше тёмные или даже чёрные. Область головы, брюшка и область ушей раскрашены в светлые оттенки, причём их интенсивность варьируется от светло-серых до светло-коричневых тонов.',
        'У воробья мощный клюв тёмного оттенка, а хвост короткий и окрашен в одни тона. Вырастают воробьи до 15 сантиметров максимум, при весе не больше 35 граммов. Размах крыльев птицы достигает около 27 сантиметров.',
      ],
      image: bird,
      imageBig: birdBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 2,
      name: 'Синица большая',
      description: 'Яркая птица с жёлтым брюшком',
      pageDescription: [
        'Синица большая — энергичная и яркая птица, которую легко узнать по её контрастному оперению. Голова чёрная с белыми щеками, брюшко ярко-жёлтое, а спина оливково-зелёная. Через грудь проходит чёрная полоса, которая у самцов шире, чем у самок. Крылья и хвост имеют голубовато-серый оттенок с белыми отметинами.',
        'Длина тела синицы достигает 14–15 сантиметров, вес — около 17–21 грамма, а размах крыльев — до 24 сантиметров. Эти птицы питаются семенами, орехами и насекомыми, часто посещая кормушки в садах и парках. Они обитают в лесах, садах и пригородах.',
      ],
      image: sinica,
      imageBig: sinicaBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 3,
      name: 'Голубь сизый',
      description: 'Городская птица',
      pageDescription: [
        'Голубь сизый — одна из самых известных городских птиц, которую можно встретить практически в любом уголке мира. Его оперение серое с более тёмными оттенками на хвосте и крыльях, а шея переливается радужными цветами — от фиолетового до зелёного. Глаза оранжевые или красноватые, а клюв чёрный с белым основанием.',
        'Длина тела голубя составляет 29–36 сантиметров, вес — 200–380 граммов, размах крыльев — до 70 сантиметров. Питается зёрнами, семенами, хлебными крошками и пищевыми отходами. Голуби легко адаптируются к городской среде, гнездясь на зданиях и мостах.',
      ],
      image: golub,
      imageBig: golubBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 4,
      name: 'Дятел пёстрый',
      description: 'Птица с ярким оперением',
      pageDescription: [
        'Дятел пёстрый — лесная птица, известная своим характерным стуком по стволам деревьев. Оперение дятла контрастное: верхняя часть тела чёрная с белыми пятнами на крыльях, брюшко белое, а на голове у самцов ярко-красная "шапочка". У самок красный цвет присутствует только на затылке. Подхвостье также красное.',
        'Длина тела дятла — 20–26 сантиметров, вес — 60–110 граммов, размах крыльев — до 38–44 сантиметров. Питается насекомыми, личинками, семенами и ягодами. Обитает в лиственных и смешанных лесах, где выдалбливает дупла для гнёзд.',
      ],
      image: woody,
      imageBig: woodyBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 5,
      name: 'Ворона серая',
      description: 'Умная городская птица',
      pageDescription: [
        'Ворона серая — крупная и умная птица, которую легко узнать по двухцветному оперению: голова, крылья и хвост чёрные, а тело серое. Клюв мощный, чёрный, а глаза тёмные, с проницательным взглядом. Вороны известны своим интеллектом и способностью решать сложные задачи.',
        'Длина тела вороны достигает 44–51 сантиметра, вес — 400–700 граммов, размах крыльев — до 98 сантиметров. Питается всем: от зёрен и фруктов до насекомых, мелких животных и пищевых отходов. Обитает в городах, деревнях и лесах.',
      ],
      image: vorona,
      imageBig: voronaBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 6,
      name: 'Снегирь',
      description: 'Птица с красной грудкой',
      pageDescription: [
        'Снегирь — яркая зимняя птица, которую легко узнать по красной грудке у самцов. Голова и крылья чёрные, спина серая, а брюшко белое. Самки имеют более скромный окрас с коричневато-розовой грудкой. Клюв короткий, конический, приспособленный для раскалывания семян.',
        'Длина тела снегиря — 15–16 сантиметров, вес — 20–30 граммов, размах крыльев — до 26 сантиметров. Питается ягодами (особенно рябиной), семенами и почками. Обитает в хвойных и смешанных лесах, зимой часто появляется в садах и парках.',
      ],
      image: snegir,
      imageBig: snegirBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 7,
      name: 'Ястреб',
      description: 'Хищная птица с острым взглядом',
      pageDescription: [
        'Ястреб (перепелятник) — ловкая хищная птица с короткими крыльями и длинным хвостом, идеально приспособленная для манёвров в лесу. Оперение сверху серо-бурое, снизу белое с тёмными поперечными полосами. Глаза жёлтые или оранжевые, клюв крючковатый. Самки крупнее самцов.',
        'Длина тела ястреба — 28–38 сантиметров, вес — 110–340 граммов, размах крыльев — до 60–80 сантиметров. Питается мелкими птицами, грызунами и насекомыми, охотясь на лету. Обитает в лесах, парках и пригородах.',
      ],
      image: yastreb,
      imageBig: yastrebBig,
      relatedGrains: [],
    },
    {
      id: 8,
      name: 'Орёл степной',
      description: 'Мощная хищная птица',
      pageDescription: [
        'Орёл степной — величественная птица с тёмно-бурым оперением и широкими крыльями. Голова светлее тела, с мощным жёлтым клювом и тёмными глазами. Хвост длинный, слегка закруглённый. Молодые особи имеют белые пятна на крыльях, которые исчезают с возрастом.',
        'Длина тела орла — 62–85 сантиметров, вес — 2–4,9 килограмма, размах крыльев — до 2,2 метра. Питается грызунами, зайцами и мелкими птицами, охотясь в степях и открытых ландшафтах. Гнездится на возвышенностях или низких деревьях.',
      ],
      image: eagle,
      imageBig: eagleBig,
      relatedGrains: [],
    },
    {
      id: 9,
      name: 'Скворец',
      description: 'Птица с переливчатым оперением',
      pageDescription: [
        'Скворец — небольшая птица с блестящим чёрным оперением, которое на солнце переливается зелёными, фиолетовыми и бронзовыми оттенками. Весной перья украшены белыми крапинами, которые к осени исчезают. Клюв жёлтый, острый, а ноги красноватые.',
        'Длина тела скворца — 19–22 сантиметра, вес — 60–90 граммов, размах крыльев — до 37–42 сантиметров. Питается насекомыми, ягодами и семенами. Обитает в садах, полях и городах, часто гнездится в дуплах или скворечниках.',
      ],
      image: skvorec,
      imageBig: skvorecBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 10,
      name: 'Ласточка',
      description: 'Птица с длинным хвостом',
      pageDescription: [
        'Ласточка (деревенская) — изящная птица с длинным раздвоенным хвостом и стремительным полётом. Оперение сверху тёмно-синее с металлическим отливом, брюшко белое, а горло и лоб красно-коричневые. Клюв короткий, широкий, приспособленный для ловли насекомых в воздухе.',
        'Длина тела ласточки — 17–19 сантиметров, вес — 16–25 граммов, размах крыльев — до 32–34 сантиметров. Питается исключительно насекомыми, ловя их на лету. Обитает в сельской местности, городах и у водоёмов, гнездится под крышами или на скалах.',
      ],
      image: lastochka,
      imageBig: lastochkaBig,
      relatedGrains: [
        { id: 1, name: 'Пшеница', image: pshenica },
        { id: 2, name: 'Просо', image: proso },
        { id: 3, name: 'Лён', image: len },
        { id: 6, name: 'Ячмень', image: yachmen },
        { id: 4, name: 'Кукуруза', image: kukuruza },
        { id: 5, name: 'Сорго', image: sorgo },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
  ],
  grains: [
    {
      id: 1,
      name: 'Пшеница',
      basePrice: 50,
      description:
        'Отборная пшеница для кормления птиц. Полезный и доступный вариант.',
      pageDescription: [
        'Пшеница представляет собой однолетнее растение, способное вырастать до полутораметровой высоты. Заросли при этом всегда прямые и плотные, поскольку стебель растения практически идеально прямой и не имеет ответвлений. Однако, от стебля отходят тонкие, неширокие (до двух сантиметров) и длинные листья, благодаря чему заросли этого растения выглядят очень густыми. На вершине стебля располагается колосок, в котором находятся зёрна.',
      ],
      image: pshenica,
      imageBig: pshenicaBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 2,
      name: 'Просо',
      basePrice: 60,
      description:
        'Натуральное просо для мелких и средних птиц. Лёгкий и вкусный корм.',
      pageDescription: [
        'Просо — однолетнее травянистое растение семейства злаковых, достигающее в высоту от 0,5 до 1,5 метров. Имеет мочковатую корневую систему и цилиндрические стебли, которые могут быть как прямыми, так и ветвистыми. Листья проса линейно-ланцетные, длинные (до 65 см) и широкие (до 4 см), с шероховатой поверхностью.',
        'Соцветие проса — метёлка длиной 15-30 см, состоящая из многочисленных колосков. Каждый колосок содержит два цветка, один из которых обычно бесплодный.',
      ],
      image: proso,
      imageBig: prosoBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 3,
      name: 'Лён',
      basePrice: 55,
      description:
        'Мелкие льняные семечки для птиц. Ннатуральный продукт. Подходят для ежедневной подкормки.',
      pageDescription: [
        'Лён — однолетнее растение с тонким прямостоячим стеблем высотой 30-60 см, ветвящимся в верхней части. Листья узкие, ланцетовидные, длиной 2-3 см, расположены поочерёдно. Цветки льна нежные, голубого или белого цвета, диаметром 1,5-2,5 см, с пятью лепестками. Каждый цветок живёт всего один день, но растение постоянно образует новые бутоны.',
        'Плод льна — круглая коробочка диаметром 6-8 мм, содержащая 10 плоских блестящих семян.',
      ],
      image: len,
      imageBig: lenBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 4,
      name: 'Кукуруза',
      basePrice: 70,
      description:
        'Цельные кукурузные зёрна для птиц. Питательно и легко усваивается.',
      pageDescription: [
        'Кукуруза — высокорослое однолетнее растение, достигающее 1,5-3 метров в высоту. Имеет мощную корневую систему и толстый прямостоячий стебель с явно выраженными узлами. Листья крупные, линейно-ланцетные, длиной до 1 метра и шириной 10 см, с параллельным жилкованием и шероховатой поверхностью.',
        'Кукуруза — однодомное растение: мужские цветки собраны в метёлки на верхушке стебля, а женские — в початки, расположенные в пазухах листьев.',
      ],
      image: kukuruza,
      imageBig: kukuruzaBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 5,
      name: 'Сорго',
      basePrice: 65,
      description:
        'Питательное зерно сорго для экзотических птиц. Натуральный и вкусный корм.',
      pageDescription: [
        'Сорго — высокорослое злаковое растение, напоминающее кукурузу, но с более тонкими стеблями. Высота растения варьируется от 0,5 до 3 метров в зависимости от вида. Стебли прямостоячие, с хорошо выраженными узлами. Листья длинные (до 1 м), ланцетовидные, с восковым налётом, который помогает растению сохранять влагу.',
        'Соцветие сорго — метёлка длиной 10-70 см, которая может быть компактной или раскидистой. Зёрна мелкие (3-4 мм), округлые или овальные, окрашены в белый, жёлтый, красный или коричневый цвет.',
      ],
      image: sorgo,
      imageBig: sorgoBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
    {
      id: 6,
      name: 'Ячмень',
      basePrice: 50,
      description:
        'Питательное лакомство для городских птиц. Натуральный и легко усваиваемый кормю',
      pageDescription: [
        'Ячмень — однолетнее злаковое растение высотой 30-100 см с прямостоячими, гладкими стеблями. Листья линейные, длиной 15-30 см и шириной 1-2 см, с гладкими или слегка шероховатыми краями. Корневая система мочковатая, проникающая на глубину до 1,5 метров, что делает ячмень устойчивым к засухе.',
        'Соцветие ячменя — сложный колос длиной 7-15 см с ланцетовидными колосками, расположенными по три на каждом уступе стержня. Каждый колосок содержит один плодущий цветок.',
      ],
      image: yachmen,
      imageBig: yachmenBig,
      relatedBirds: [
        { id: 1, name: 'Домовый воробей', image: bird },
        { id: 2, name: 'Синица большая', image: sinica },
        { id: 3, name: 'Голубь сизый', image: golub },
        { id: 5, name: 'Ворона серая', image: vorona },
        { id: 4, name: 'Дятел пёстрый', image: woody },
        { id: 6, name: 'Снегирь', image: snegir },
        { id: 9, name: 'Скворец', image: skvorec },
        { id: 10, name: 'Ласточка', image: lastochka },
      ],
      relatedMixes: [
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
        { id: 1, name: 'Cliffi (Италия)', image: forBird },
        { id: 2, name: 'Benelux корма', image: forBird1 },
        { id: 3, name: 'Cliffi (Италия)', image: forBird2 },
        { id: 4, name: 'Benelux корма', image: forBird3 },
      ],
    },
  ],
};
