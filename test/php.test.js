let assert = require("assert");
let path = require("path");
let phpLoader = require("./../php-loader");

describe("it should load php language files", function () {
  const loaderMock = {
    addDependency: () => {}
  };

  it("should load regular php translation", function () {
    let content = phpLoader.execute("./test/fixtures/php", {}, loaderMock);

    assert.deepStrictEqual(content.en, {
      auth: {
        login: "Login"
      },
      translation: {
        validation: {
          required: "this field is required"
        },
        another: "translation"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should be able to includeOnly options", function () {
    let content = phpLoader.execute("./test/fixtures/php", {
      includeOnly: ["auth"]
    }, loaderMock);

    assert.deepStrictEqual(content.en, {
      auth: {
        login: "Login"
      }
    });
  });

  it("should be able to exclude options", function () {
    let content = phpLoader.execute("./test/fixtures/php", {
      exclude: ["translation"]
    }, loaderMock);

    assert.deepStrictEqual(content.en, {
      auth: {
        login: "Login"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should load both languages", function () {
    let content = phpLoader.execute("./test/fixtures/php", {}, loaderMock);

    assert.deepStrictEqual(content.en, {
      auth: {
        login: "Login"
      },
      translation: {
        validation: {
          required: "this field is required"
        },
        another: "translation"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });

    assert.deepEqual(content.es, {
      translation: {
        validation: {
          required: "este campo es obrigatorio"
        },
        another: "traducion"
      },
      "comp/package": {
        package: {
          ipsum: "lorem"
        },
        "site amet": "dolor"
      }
    });
  });

  it("should be able to replace parameters", function () {
    let content = phpLoader.execute("./test/fixtures/php-with-parameters", {
      parameters: "{{ $1 }}"
    }, loaderMock);

    assert.deepEqual(content.en, {
      validation: {
        required: "the field {{ input }} is required"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should be able to load nested folders", function () {
    let content = phpLoader.execute("./test/fixtures/php-with-nested-folders", {}, loaderMock);

    assert.deepEqual(content.en, {
      validation: {
        required: "This field is required"
      },
      "menu/main": {
        home: "Home",
        about: "About"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should be able to use namespace", function () {
    let namespace = "test";
    let content = phpLoader.execute("./test/fixtures/php-with-namespace", {
      namespace: namespace
    }, loaderMock);

    assert.deepEqual(content.en[namespace], {
      validation: {
        required: "This field is required"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should be able to use namespace and replace parameters", function () {
    let namespace = "test";
    let content = phpLoader.execute("./test/fixtures/php-with-namespace-parameters", {
      namespace: namespace,
      parameters: "{{ $1 }}"
    }, loaderMock);

    assert.deepEqual(content.en[namespace], {
      validation: {
        required: "the field {{ input }} is required"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should not fail execution with invalid file", function () {
    let content = phpLoader.execute("./test/fixtures/php-with-one-invalid-file", {}, loaderMock);

    assert.deepEqual(content.en, {
      translation: {
        validation: {
          required: "this field is required"
        },
        another: "translation"
      },
      "comp/package": {
        package: {
          lorem: "ipsum"
        },
        dolor: "sit amet"
      }
    });
  });

  it("should register translation files as dependencies for live reloading", function () {
    let dependency = "";
    const loaderMock = {
      addDependency: dep => {
        dependency = dep;
      }
    };

    phpLoader.execute("./test/fixtures/php-with-namespace-as-dependency", {}, loaderMock);

    const expected = "/test/fixtures/php-with-namespace-as-dependency/en/validation.php";
    const actual = dependency.substring(dependency.length - expected.length);
    assert.deepStrictEqual(actual.split(path.sep), expected.split("/"));
  });
});
