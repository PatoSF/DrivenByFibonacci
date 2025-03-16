// Code generated by mockery v2.50.0. DO NOT EDIT.

package mocks

import (
	common "github.com/ethereum/go-ethereum/common"
	big "github.com/smartcontractkit/chainlink-integrations/evm/utils/big"

	context "context"

	forwarders "github.com/smartcontractkit/chainlink/v2/core/chains/evm/forwarders"

	mock "github.com/stretchr/testify/mock"

	sqlutil "github.com/smartcontractkit/chainlink-common/pkg/sqlutil"
)

// ORM is an autogenerated mock type for the ORM type
type ORM struct {
	mock.Mock
}

type ORM_Expecter struct {
	mock *mock.Mock
}

func (_m *ORM) EXPECT() *ORM_Expecter {
	return &ORM_Expecter{mock: &_m.Mock}
}

// CreateForwarder provides a mock function with given fields: ctx, addr, evmChainId
func (_m *ORM) CreateForwarder(ctx context.Context, addr common.Address, evmChainId big.Big) (forwarders.Forwarder, error) {
	ret := _m.Called(ctx, addr, evmChainId)

	if len(ret) == 0 {
		panic("no return value specified for CreateForwarder")
	}

	var r0 forwarders.Forwarder
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, big.Big) (forwarders.Forwarder, error)); ok {
		return rf(ctx, addr, evmChainId)
	}
	if rf, ok := ret.Get(0).(func(context.Context, common.Address, big.Big) forwarders.Forwarder); ok {
		r0 = rf(ctx, addr, evmChainId)
	} else {
		r0 = ret.Get(0).(forwarders.Forwarder)
	}

	if rf, ok := ret.Get(1).(func(context.Context, common.Address, big.Big) error); ok {
		r1 = rf(ctx, addr, evmChainId)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ORM_CreateForwarder_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'CreateForwarder'
type ORM_CreateForwarder_Call struct {
	*mock.Call
}

// CreateForwarder is a helper method to define mock.On call
//   - ctx context.Context
//   - addr common.Address
//   - evmChainId big.Big
func (_e *ORM_Expecter) CreateForwarder(ctx interface{}, addr interface{}, evmChainId interface{}) *ORM_CreateForwarder_Call {
	return &ORM_CreateForwarder_Call{Call: _e.mock.On("CreateForwarder", ctx, addr, evmChainId)}
}

func (_c *ORM_CreateForwarder_Call) Run(run func(ctx context.Context, addr common.Address, evmChainId big.Big)) *ORM_CreateForwarder_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(common.Address), args[2].(big.Big))
	})
	return _c
}

func (_c *ORM_CreateForwarder_Call) Return(fwd forwarders.Forwarder, err error) *ORM_CreateForwarder_Call {
	_c.Call.Return(fwd, err)
	return _c
}

func (_c *ORM_CreateForwarder_Call) RunAndReturn(run func(context.Context, common.Address, big.Big) (forwarders.Forwarder, error)) *ORM_CreateForwarder_Call {
	_c.Call.Return(run)
	return _c
}

// DeleteForwarder provides a mock function with given fields: ctx, id, cleanup
func (_m *ORM) DeleteForwarder(ctx context.Context, id int64, cleanup func(sqlutil.DataSource, int64, common.Address) error) error {
	ret := _m.Called(ctx, id, cleanup)

	if len(ret) == 0 {
		panic("no return value specified for DeleteForwarder")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, int64, func(sqlutil.DataSource, int64, common.Address) error) error); ok {
		r0 = rf(ctx, id, cleanup)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// ORM_DeleteForwarder_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'DeleteForwarder'
type ORM_DeleteForwarder_Call struct {
	*mock.Call
}

// DeleteForwarder is a helper method to define mock.On call
//   - ctx context.Context
//   - id int64
//   - cleanup func(sqlutil.DataSource , int64 , common.Address) error
func (_e *ORM_Expecter) DeleteForwarder(ctx interface{}, id interface{}, cleanup interface{}) *ORM_DeleteForwarder_Call {
	return &ORM_DeleteForwarder_Call{Call: _e.mock.On("DeleteForwarder", ctx, id, cleanup)}
}

func (_c *ORM_DeleteForwarder_Call) Run(run func(ctx context.Context, id int64, cleanup func(sqlutil.DataSource, int64, common.Address) error)) *ORM_DeleteForwarder_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(int64), args[2].(func(sqlutil.DataSource, int64, common.Address) error))
	})
	return _c
}

func (_c *ORM_DeleteForwarder_Call) Return(_a0 error) *ORM_DeleteForwarder_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *ORM_DeleteForwarder_Call) RunAndReturn(run func(context.Context, int64, func(sqlutil.DataSource, int64, common.Address) error) error) *ORM_DeleteForwarder_Call {
	_c.Call.Return(run)
	return _c
}

// FindForwarders provides a mock function with given fields: ctx, offset, limit
func (_m *ORM) FindForwarders(ctx context.Context, offset int, limit int) ([]forwarders.Forwarder, int, error) {
	ret := _m.Called(ctx, offset, limit)

	if len(ret) == 0 {
		panic("no return value specified for FindForwarders")
	}

	var r0 []forwarders.Forwarder
	var r1 int
	var r2 error
	if rf, ok := ret.Get(0).(func(context.Context, int, int) ([]forwarders.Forwarder, int, error)); ok {
		return rf(ctx, offset, limit)
	}
	if rf, ok := ret.Get(0).(func(context.Context, int, int) []forwarders.Forwarder); ok {
		r0 = rf(ctx, offset, limit)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]forwarders.Forwarder)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, int, int) int); ok {
		r1 = rf(ctx, offset, limit)
	} else {
		r1 = ret.Get(1).(int)
	}

	if rf, ok := ret.Get(2).(func(context.Context, int, int) error); ok {
		r2 = rf(ctx, offset, limit)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

// ORM_FindForwarders_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FindForwarders'
type ORM_FindForwarders_Call struct {
	*mock.Call
}

// FindForwarders is a helper method to define mock.On call
//   - ctx context.Context
//   - offset int
//   - limit int
func (_e *ORM_Expecter) FindForwarders(ctx interface{}, offset interface{}, limit interface{}) *ORM_FindForwarders_Call {
	return &ORM_FindForwarders_Call{Call: _e.mock.On("FindForwarders", ctx, offset, limit)}
}

func (_c *ORM_FindForwarders_Call) Run(run func(ctx context.Context, offset int, limit int)) *ORM_FindForwarders_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(int), args[2].(int))
	})
	return _c
}

func (_c *ORM_FindForwarders_Call) Return(_a0 []forwarders.Forwarder, _a1 int, _a2 error) *ORM_FindForwarders_Call {
	_c.Call.Return(_a0, _a1, _a2)
	return _c
}

func (_c *ORM_FindForwarders_Call) RunAndReturn(run func(context.Context, int, int) ([]forwarders.Forwarder, int, error)) *ORM_FindForwarders_Call {
	_c.Call.Return(run)
	return _c
}

// FindForwardersByChain provides a mock function with given fields: ctx, evmChainId
func (_m *ORM) FindForwardersByChain(ctx context.Context, evmChainId big.Big) ([]forwarders.Forwarder, error) {
	ret := _m.Called(ctx, evmChainId)

	if len(ret) == 0 {
		panic("no return value specified for FindForwardersByChain")
	}

	var r0 []forwarders.Forwarder
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, big.Big) ([]forwarders.Forwarder, error)); ok {
		return rf(ctx, evmChainId)
	}
	if rf, ok := ret.Get(0).(func(context.Context, big.Big) []forwarders.Forwarder); ok {
		r0 = rf(ctx, evmChainId)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]forwarders.Forwarder)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, big.Big) error); ok {
		r1 = rf(ctx, evmChainId)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ORM_FindForwardersByChain_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FindForwardersByChain'
type ORM_FindForwardersByChain_Call struct {
	*mock.Call
}

// FindForwardersByChain is a helper method to define mock.On call
//   - ctx context.Context
//   - evmChainId big.Big
func (_e *ORM_Expecter) FindForwardersByChain(ctx interface{}, evmChainId interface{}) *ORM_FindForwardersByChain_Call {
	return &ORM_FindForwardersByChain_Call{Call: _e.mock.On("FindForwardersByChain", ctx, evmChainId)}
}

func (_c *ORM_FindForwardersByChain_Call) Run(run func(ctx context.Context, evmChainId big.Big)) *ORM_FindForwardersByChain_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(big.Big))
	})
	return _c
}

func (_c *ORM_FindForwardersByChain_Call) Return(_a0 []forwarders.Forwarder, _a1 error) *ORM_FindForwardersByChain_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *ORM_FindForwardersByChain_Call) RunAndReturn(run func(context.Context, big.Big) ([]forwarders.Forwarder, error)) *ORM_FindForwardersByChain_Call {
	_c.Call.Return(run)
	return _c
}

// FindForwardersInListByChain provides a mock function with given fields: ctx, evmChainId, addrs
func (_m *ORM) FindForwardersInListByChain(ctx context.Context, evmChainId big.Big, addrs []common.Address) ([]forwarders.Forwarder, error) {
	ret := _m.Called(ctx, evmChainId, addrs)

	if len(ret) == 0 {
		panic("no return value specified for FindForwardersInListByChain")
	}

	var r0 []forwarders.Forwarder
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, big.Big, []common.Address) ([]forwarders.Forwarder, error)); ok {
		return rf(ctx, evmChainId, addrs)
	}
	if rf, ok := ret.Get(0).(func(context.Context, big.Big, []common.Address) []forwarders.Forwarder); ok {
		r0 = rf(ctx, evmChainId, addrs)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]forwarders.Forwarder)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, big.Big, []common.Address) error); ok {
		r1 = rf(ctx, evmChainId, addrs)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ORM_FindForwardersInListByChain_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FindForwardersInListByChain'
type ORM_FindForwardersInListByChain_Call struct {
	*mock.Call
}

// FindForwardersInListByChain is a helper method to define mock.On call
//   - ctx context.Context
//   - evmChainId big.Big
//   - addrs []common.Address
func (_e *ORM_Expecter) FindForwardersInListByChain(ctx interface{}, evmChainId interface{}, addrs interface{}) *ORM_FindForwardersInListByChain_Call {
	return &ORM_FindForwardersInListByChain_Call{Call: _e.mock.On("FindForwardersInListByChain", ctx, evmChainId, addrs)}
}

func (_c *ORM_FindForwardersInListByChain_Call) Run(run func(ctx context.Context, evmChainId big.Big, addrs []common.Address)) *ORM_FindForwardersInListByChain_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(big.Big), args[2].([]common.Address))
	})
	return _c
}

func (_c *ORM_FindForwardersInListByChain_Call) Return(_a0 []forwarders.Forwarder, _a1 error) *ORM_FindForwardersInListByChain_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *ORM_FindForwardersInListByChain_Call) RunAndReturn(run func(context.Context, big.Big, []common.Address) ([]forwarders.Forwarder, error)) *ORM_FindForwardersInListByChain_Call {
	_c.Call.Return(run)
	return _c
}

// NewORM creates a new instance of ORM. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewORM(t interface {
	mock.TestingT
	Cleanup(func())
}) *ORM {
	mock := &ORM{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
