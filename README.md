# DescribeIt

Play with your friends, and see how well you really know each other

## Questions
- If you want to submit a question that contains a player's name, make sure to include `{{player}}` somewhere in the question
- For example: `Describe {{player}}'s favorite dream`
- The `player` field will automatically be polulated with the name of a player in the current game

#### development

`make dev`

Starts webpack dev server listening on port 8080

[localhost:8080](http://localhost:8080)

#### deployment (dockerized)

```
make build              # builds docker image
make run                # starts nginx server running in docker on port 80
```

[localhost](http://localhost)

