![factorhouse](./images/factorhouse.jfif)

## Pub List

## Conventions

Each publication lives in its own directory under `publications/`. The build script will process all `.md` files in each publication directory and output them as HTML files with the same name.

If you have images for a publication, chuck them in an `images/` directory within the publication folder. The build script will copy this directory to the output automatically.

Structure:
```
publications/
  my-publication/
    index.md        # Gets built to my-publication/index.html
    other.md        # Gets built to my-publication/other.html
    images/         # Gets copied to output as-is
      diagram.png
```

## Support

Any issues? Contact [support](https://factorhouse.io/support/) or view our [docs](https://docs.factorhouse.io/).

## License

This repository is released under the Apache 2.0 License.

Copyright © Factor House.
