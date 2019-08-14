package app

import "github.com/gorilla/mux"

type App struct {
	rootRouter *mux.Router
	closeChan  chan struct{}
	doneChan   chan struct{}
}

func NewApp(handler *mux.Router) *App {
	return &App{
		rootRouter: handler,
		closeChan:  make(chan struct{}),
		doneChan:   make(chan struct{}),
	}
}

func (a *App) Run() {
	apiRouter := a.rootRouter

	NewLoadoutService(apiRouter, nil)
	<-a.closeChan
	a.doneChan <- struct{}{}
}

func (a *App) Stop() {
	a.closeChan <- struct{}{}
	close(a.closeChan)
	<-a.doneChan
}
