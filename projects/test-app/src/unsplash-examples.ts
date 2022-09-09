import { BlurhashDescription } from 'angular-pharkas-blurhash'

export const images = Object.freeze(
  [
    {
      imageSrc: './assets/images/ilgmyzin-0gPydmQhnzY-unsplash.jpg',
      attribution:
        'Photo by <a href="https://unsplash.com/es/@ilgmyzin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ilgmyzin</a> on <a href="https://unsplash.com/images?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
      width: 2500,
      height: 2000,
      blurhash: 'L8BDCA-i$rM.~T-,RoEN?HtdNFE0',
      imageAlt: 'Purple render',
    },
    {
      imageSrc: './assets/images/masahiro-miyagi-bwNTzXlm0fk-unsplash.jpg',
      attribution:
        'Photo by <a href="https://unsplash.com/@masamasa3?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">masahiro miyagi</a> on <a href="https://unsplash.com/images?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
      width: 6000,
      height: 4000,
      blurhash:
        '|4BMP.?g004[00#bQ+VEGH}]Z_=zJ;Ee?c$_R6E400Di%gTJyE.7xnS7mm9?tV4;I9-paHI.XnxZ0Ko%vzrW%4M{T1b]bY,vS^tL=yIr9an-sks.xSyCkqEfsER5akwIkRtlogWAJ*WooaoNrrn*R%aQRjxan*XNt6NGRp',
      imageAlt: 'Osaka street',
    },
    {
      imageSrc: './assets/images/maksym-tymchyk-9coV7KX5gts-unsplash.jpg',
      attribution:
        'Photo by <a href="https://unsplash.com/@maksym_tymchyk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maksym Tymchyk 🇺🇦</a> on <a href="https://unsplash.com/images?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
      width: 3546,
      height: 5320,
      blurhash: 'U$Lq8;tRSOt7~Wa~ozt7b_e.WBWr%gn~RPWB',
      imageAlt: 'Daffodil',
    },
  ].map((item) =>
    Object.freeze<BlurhashDescription & { attribution: string }>(item)
  )
)
