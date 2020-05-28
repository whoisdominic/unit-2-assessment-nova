const React = require("react");
const Layout = require("./Template");

class Index extends React.Component {
  render() {
    const { todos } = this.props;
    console.log("in view", todos);
    let list;
    if (todos.length >= 1) {
      list = true;
    } else {
      list = false;
    }
    return (
      <>
        <Layout>
          <div className="main-cont">
            <h1 className="title">To Do List</h1>
            <form action="/todo" method="POST">
              <input type="text" name="entry" id="entry" />
              <input className="btn green" type="submit" value="Add to Do" />
            </form>
            <div className="list-cont">
              <div className="to-do-dis">
                <ul>
                  {list ? (
                    todos.map((item, index) => {
                      return (
                        <li className="list-items" key="index">
                          {`${item.entry} - ${
                            item.done ? "Done" : "Not Done"
                          } `}
                          <form
                            className=""
                            action={`/todo/${item._id}?_method=DELETE`}
                            method="post"
                          >
                            <input
                              className="btn red"
                              type="submit"
                              value="Delete"
                            />
                          </form>
                          <form
                            action={`/todo/${item._id}?_method=put`}
                            method="POST"
                          >
                            <input
                              className="btn amber darken-2"
                              type="submit"
                              value="Mark Done"
                            />
                          </form>
                        </li>
                      );
                    })
                  ) : (
                    <li className="list-items">There are no To Dos yet!</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

module.exports = Index;
