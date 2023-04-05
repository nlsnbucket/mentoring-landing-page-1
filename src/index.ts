import { DefaultModuleFactory } from "./ModuleFactory/DefaultFactory"

const server = DefaultModuleFactory.create().setup()

server.expressServer.listen(3000, () => {
  console.log("server started")
})
