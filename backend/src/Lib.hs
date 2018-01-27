{-# LANGUAGE OverloadedStrings #-}
module Lib
    ( someFunc
    ) where

import qualified Data.Text.IO as T
import Control.Monad
import Data.Char
import System.IO
import Network
import Data.Time.LocalTime

data RequestType = GET | POST deriving (Show)

someFunc :: IO ()
someFunc = T.putStrLn "Hello, World!"
