Contributing
======

Chainpro is open to, and grateful for, any contributions made by the community.

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/stremann/chainpro/issues) to make sure your issue hasn't already been reported.

### Bugs and Improvements

Chainpro uses the issue tracker to keep track of bugs and improvements to Chainpro itself, its examples, and the documentation. I encourage you to open issues to discuss improvements, architecture, theory, internal implementation, etc. If a topic has been discussed before, please join the previous discussion.

### Help Us Help You

It is a good idea to structure your code and question in a way that is easy to read to entice people to answer it. For example, use syntax highlighting, indentation, and split text in paragraphs.

Please keep in mind that people spend their free time trying to help you. You can make it easier for them if you provide versions of the relevant libraries and a runnable small project reproducing your issue. You can put your code on [JSBin](http://jsbin.com) or, for bigger projects, on GitHub. Make sure all the necessary dependencies are declared in `package.json` so anyone can run `npm install && npm start` and reproduce your issue.

## Development

Visit the [issue tracker](https://github.com/stremann/chainpro/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```
git clone https://github.com/your-username/chainpro.git
```

Running the `build` task will create a build version of Chainpro.

```
npm start
```

### Sending a Pull Request

For non-trivial changes, please open an issue with a proposal for a new feature or refactoring before starting on the work. I don't want you to waste your efforts on a pull request that will not be accepted.

On the other hand, sometimes the best way to start a conversation *is* to send a pull request. Use your best judgement!

In general, the contribution workflow looks like this:

* Open a new issue in the [issue tracker](https://github.com/stremann/chainpro/issues).
* Fork the repo.
* Create a new feature branch based on the `master` branch.
* Make sure all tests pass and there are no linting errors.
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, I'll try to get back to you as soon as possible.

Thank you for contributing!